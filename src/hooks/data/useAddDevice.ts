import { useCallback, useReducer } from 'react';
import { useLocation } from 'react-router-dom';
import { setDevicePic } from '../../store/slices/deviceSlice';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../redux/useRedux';
import { deviceReducer, initialState } from '../../reducers/device/deviceReducer';
import {
  useCreateDeviceMutation,
  useLazyGetDeviceQuery,
  useUpdateDeviceMutation,
} from '../../store/api/devicesApi';
import { DeviceActionTypes } from '../../reducers/device/deviceTypes';
import { IContractor } from '../../types/content';
import { IEntity, IDevice } from './../../types/devices';
import { FormValidation, ValidateField } from '../../utils/validation/DeviceValidation';
import { handleApiError } from '../../utils/errors/handleApiError';

export function useAddDevice() {
  const dispatchDeviceData = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const [state, dispatch] = useReducer(deviceReducer, initialState);
  const { checked, itemType, device } = state;

  const locationPath = useLocation();
  const exceptionPath = /add-device$/.test(locationPath.pathname);

  const [createDevice] = useCreateDeviceMutation();
  const [getDevice] = useLazyGetDeviceQuery();
  const [updateDevice] = useUpdateDeviceMutation();

  const handleNumber = useCallback((num: number) => {
    dispatch({ type: DeviceActionTypes.SET_DEVICE, payload: { weight: num } });
  }, []);

  const handleExtNumber = useCallback(
    (num: number, fieldName: string) => {
      const data = ValidateField(fieldName, num);
      dispatch({
        type: DeviceActionTypes.SET_DEVICE,
        payload: { [fieldName]: num },
      });
      dispatch({
        type: DeviceActionTypes.SET_ERROR,
        payload: { [fieldName]: data as string },
      });
    },
    []
  );

  const handleResetDevice = useCallback(() => {
    dispatch({ type: DeviceActionTypes.RESET_DEVICE });
    dispatch({ type: DeviceActionTypes.RESET_ERROR });
    dispatchDeviceData(setDevicePic(''));
  }, [dispatchDeviceData]);

  const handleAddDevice = useCallback(async () => {
    try {
      const validationErrors = FormValidation(device, itemType);
      dispatch({
        type: DeviceActionTypes.SET_ERROR,
        payload: validationErrors as Record<string, string>,
      });
      if (Object.keys(validationErrors).length === 0) {
        if (!user) return;
        const updatedData = {
          ...device,
          addedById: user.id,
          updatedById: user.id,
        };
        if (exceptionPath) {
          const data = await createDevice(updatedData).unwrap();
          if (data) {
            toast(data?.message, { type: 'success' });
            handleResetDevice();
            dispatchDeviceData(setDevicePic(''));
          }
        } else {
          const data = await updateDevice(updatedData).unwrap();
          if (data) {
            toast(data?.message, { type: 'success' });
            handleResetDevice();
            dispatchDeviceData(setDevicePic(''));
          }
        }
      } else {
        console.error('Validation errors:', validationErrors);
      }
    } catch (err) {
      handleApiError(err);
    }
  }, [device, itemType, user, exceptionPath, createDevice, updateDevice, dispatchDeviceData, handleResetDevice]);


  const handleInputChange = useCallback(<T extends string | IEntity | IContractor>(
    field: keyof IDevice,
    value: T
  ) => {
    const validationErrors = ValidateField(field as keyof IDevice, value);
    dispatch({
      type: DeviceActionTypes.SET_ERROR,
      payload: { [field]: validationErrors as string },
    });
    const isEntity = (obj: any): obj is IEntity => 'slug' in obj;
    const inputValue =
      typeof value === 'string' ? value : isEntity(value) ? value.slug : '';
    dispatch({
      type: DeviceActionTypes.SET_DEVICE,
      payload: { [field]: inputValue },
    });
  }, []);

  const handleChecked = useCallback(() => {
    dispatch({ type: DeviceActionTypes.SET_CHECKED, payload: !checked });
    dispatch({
      type: DeviceActionTypes.SET_DEVICE,
      payload: { isFunctional: !checked },
    });
  }, [checked]);

  const handleTypeChange = useCallback(
    (item: IEntity) => {
      console.log(item);
      handleInputChange('typeSlug', item.slug || '');
      handleInputChange('typeName', item.name || '');
      handleInputChange('typeId', item.id || '');
    },
    [handleInputChange]
  );

  const handleModelChange = useCallback(
    (item: IEntity) => {
      handleInputChange('modelName', item.name || '');
      handleInputChange('modelSlug', item.slug || '');
      handleInputChange('modelId', item.id || '');
    },
    [handleInputChange]
  );

  const handleManufacturerChange = useCallback(
    (item: IEntity) => {
      handleInputChange('manufacturerName', item.name);
      handleInputChange('manufacturerSlug', item.slug || '');
      handleInputChange('manufacturerId', item.id || '');
    },
    [handleInputChange]
  );

  const handleWarehouseChange = useCallback(
    (item: IEntity) => {
      handleInputChange('warehouseId', item.id || '');
      handleInputChange('warehouseName', item.name || '');
      handleInputChange('warehouseSlug', item.slug || '');
    },
    [handleInputChange]
  );

  const handleContractorChange = useCallback(
    (item: IContractor) => {
      handleInputChange('contractorId', item.id || '');
      handleInputChange('providerName', item.name || '');
      handleInputChange('providerSlug', item.slug || '');
    },
    [handleInputChange]
  );
  const handleStartDateChange = (item: Date | null) => {
    dispatch({
      type: DeviceActionTypes.SET_DEVICE,
      payload: { startWarrantyDate: item },
    });
  };
  const handleEndDateChange = (item: Date | null) => {
    dispatch({
      type: DeviceActionTypes.SET_DEVICE,
      payload: { endWarrantyDate: item },
    });
  };

  const handleGetDevice = useCallback(async (id: string) => {
    try {
      if (!id) return;
      dispatch({ type: DeviceActionTypes.SET_IS_UPDATE, payload: true })
      const data = await getDevice(id).unwrap();
      const { warehouse, model, warranty, ...rest } = data;
      dispatch({
        type: DeviceActionTypes.SET_DEVICE,
        payload: {
          ...rest,
          warehouseName: warehouse.name ?? '',
          warehouseSlug: warehouse.slug ?? '',
          providerName: warranty?.contractor?.name ?? '',
          providerSlug: warranty?.contractor?.slug ?? '',
          contractorId: data.contractorId ?? '',
          manufacturerName: model?.manufacturer?.name ?? '',
          manufacturerSlug: model?.manufacturer?.slug ?? '',
          typeName: model?.type.name ?? '',
          typeSlug: model?.type.slug ?? '',
          price_with_vat: Number(data.price_with_vat ?? 0),
          price_without_vat: Number(data.price_without_vat ?? 0),
          residual_price: Number(data.residual_price ?? 0),
          warrantyNumber: warranty?.warrantyNumber ?? '',
          startWarrantyDate: warranty?.startWarrantyDate ?? null,
          endWarrantyDate: warranty?.endWarrantyDate ?? null,
          modelName: model?.name ?? '',
        },
      });
      dispatch({
        type: DeviceActionTypes.SET_ITEM_TYPE,
        payload: data.model?.type?.slug ?? '',
      });
      dispatchDeviceData(setDevicePic(data.model.imagePath));
    } catch (err:unknown) {
      handleApiError(err);
    }
  }, [dispatchDeviceData, getDevice]);

  const resetModelData = useCallback(() => {
    dispatch({ type: DeviceActionTypes.SET_DEVICE, payload: { modelName: '' }});
    dispatchDeviceData(setDevicePic(''));
  }, [dispatchDeviceData]);
  
  const handleSetTitle = useCallback((item: string) => {
    dispatch({ type: DeviceActionTypes.SET_TITLE, payload: item });
  }, [dispatch]);

  const handleSetType = useCallback((item: string) => {
    dispatch({ type: DeviceActionTypes.SET_FIELD_TYPE, payload: item });
  }, [dispatch]);

  return {
    state: {
      isUpdate: state.isUpdate,
      title: state.title,
      fieldType: state.fieldType,
      typeId: state.device.typeId,
      modelId: state.device.modelId,
      manufacturerId: state.device.manufacturerId,
      device: state.device,
      errors: state.errors,
      checked: state.checked,
      itemType: state.itemType,
      startWarrantyDate: state.device.startWarrantyDate,
      endWarrantyDate: state.device.endWarrantyDate,
    },
    dispatch,
    actions: {
      handleChecked,
      handleInputChange,
      handleNumber,
      handleExtNumber,
      handleAddDevice,
      handleResetDevice,
      handleModelChange,
      handleTypeChange,
      handleManufacturerChange,
      handleWarehouseChange,
      handleContractorChange,
      handleGetDevice,
      resetModelData,
      handleStartDateChange,
      handleEndDateChange,
      handleSetTitle,
      handleSetType,
    },
    setters: {
      setIsUpdate: (value: boolean) =>
        dispatch({ type: DeviceActionTypes.SET_IS_UPDATE, payload: value }),
      setDevice: (value: Partial<IDevice>) =>
        dispatch({ type: DeviceActionTypes.SET_DEVICE, payload: value }),
    },
  };
}
