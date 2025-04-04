import { useCallback, useMemo, useEffect, useReducer } from 'react';
import { setDevicePic } from '../../store/slices/deviceSlice';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../redux/useRedux';
import { IContractor } from '../../types/content';
import { IEntity, IDevice } from './../../types/devices';
import {
  useCreateDeviceMutation,
  useLazyGetDeviceQuery,
  useUpdateDeviceMutation,
} from '../../store/api/devicesApi';
import {
  FormValidation,
  ValidateField,
} from '../../utils/validation/DeviceValidation';
import {
  isFetchBaseQueryError,
  isErrorWithMessage,
} from '../../utils/errors/error-handling';
import {
  addNewManufacturer,
  addNewType,
  addNewModel,
} from '../../utils/constants/constants';
import { useLocation } from 'react-router-dom';
import {
  deviceReducer,
  initialState,
} from '../../reducers/device/deviceReducer';
import { DeviceActionTypes } from '../../reducers/device/deviceTypes';

export function useAddDevice() {
  const [state, dispatch] = useReducer(deviceReducer, initialState);
  const user = useAppSelector((state) => state.auth.user);
  const { fieldType, checked, itemType, selectedValues, device } = state;
  const dispatchDeviceData = useAppDispatch();

  const locationPath = useLocation();
  const exceptionPath = !/add-device$/.test(locationPath.pathname);

  const [createDevice] = useCreateDeviceMutation();
  const [getDevice] = useLazyGetDeviceQuery();
  const [updateDevice] = useUpdateDeviceMutation();

  useEffect(() => {
    switch (fieldType) {
      case 'manufacturer':
        dispatch({
          type: DeviceActionTypes.SET_TITLE,
          payload: addNewManufacturer,
        });
        break;
      case 'type':
        dispatch({ type: DeviceActionTypes.SET_TITLE, payload: addNewType });
        break;
      case 'model':
        dispatch({
          type: DeviceActionTypes.SET_TITLE,
          payload: `${addNewModel} (${selectedValues['type']})`,
        });
        break;
    }
  }, [fieldType]);

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
    [ValidateField]
  );

  const handleAddDevice = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
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
          await createDevice(updatedData)
            .unwrap()
            .then((data) => {
              toast(data?.message, { type: 'success' });
              handleResetDevice();
              dispatchDeviceData(setDevicePic(''));
            });
        } else {
          console.log('test');
        }
      } else {
        console.error('Validation errors:', validationErrors);
      }
    } catch (err) {
      if (isFetchBaseQueryError(err)) {
        let errMsg: string;
        if ('error' in err) {
          errMsg = err.error;
        } else {
          if (
            err.data &&
            typeof err.data === 'object' &&
            'message' in err.data
          ) {
            errMsg = (err.data as { message: string }).message;
          } else {
            errMsg = JSON.stringify(err.data);
          }
        }
        toast(errMsg, { type: 'error' });
      } else if (isErrorWithMessage(err)) {
        console.error('Unexpected Error:', err.message);
      } else {
        console.error('Unknown Error:', err);
      }
    }
  };
  const handleResetDevice = useCallback(() => {
    // Reset device state
    dispatch({ type: DeviceActionTypes.RESET_DEVICE });
    dispatch({ type: DeviceActionTypes.RESET_ERROR });
    dispatch({ type: DeviceActionTypes.RESET_SELECTED_VALUES });
    dispatch({ type: DeviceActionTypes.SET_MANUFACTURER_ID, payload: '' });
    dispatch({ type: DeviceActionTypes.SET_TYPE_ID, payload: '' });
    dispatch({ type: DeviceActionTypes.SET_ITEM_TYPE, payload: '' });
    dispatchDeviceData(setDevicePic(''));
  }, [device]);

  const handleInputChange = <T extends string | IEntity | IContractor>(
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
    const selectValue = typeof value === 'string' ? value : value.name;
    dispatch({
      type: DeviceActionTypes.SET_DEVICE,
      payload: { [field]: inputValue },
    });
    dispatch({
      type: DeviceActionTypes.SET_SELECTED_VALUES,
      payload: { [field]: selectValue },
    });
  };

  const handleChecked = useCallback(() => {
    dispatch({ type: DeviceActionTypes.SET_CHECKED, payload: !checked });
    dispatch({
      type: DeviceActionTypes.SET_DEVICE,
      payload: { isFunctional: !checked },
    });
  }, [checked]);

  // Memoization of  device form fields (select)
  const selectedValuesMemo = useMemo(() => selectedValues, [selectedValues]);

  const handleTypeChange = useCallback(
    (item: IEntity) => {
      handleInputChange('type', item);
      handleInputChange('typeId', item.id || '');
      dispatch({ type: DeviceActionTypes.SET_ITEM_TYPE, payload: item.slug });
      dispatch({ type: DeviceActionTypes.SET_TYPE_ID, payload: item.id || '' });
    },
    [handleInputChange]
  );

  const handleModelChange = useCallback(
    (item: IEntity) => {
      handleInputChange('modelName', item.name || '');
      handleInputChange('modelId', item.id || '');
      dispatch({
        type: DeviceActionTypes.SET_MODEL_ID,
        payload: item.id || '',
      });
    },
    [handleInputChange]
  );

  const handleManufacturerChange = useCallback(
    (item: IEntity) => {
      handleInputChange('manufacturer', item);
      dispatch({
        type: DeviceActionTypes.SET_MANUFACTURER_ID,
        payload: item.id || '',
      });
    },
    [handleInputChange]
  );

  const handleWarehouseChange = useCallback(
    (item: IEntity) => {
      handleInputChange('warehouseId', item.id || '');
      handleInputChange('warehouseName', item.name || '');
    },
    [handleInputChange]
  );

  const handleContractorChange = useCallback(
    (item: IContractor) => {
      handleInputChange('contractorId', item.id || '');
      handleInputChange('provider', item.name || '');
    },
    [handleInputChange]
  );

  const handleGetDevice = useCallback(async (id: string) => {
    try {
      if (!id) return;
      const data = await getDevice(id).unwrap();
      const { warehouse, model, warranty, contractor, addedBy, updatedBy, deviceIssues,
      ...rest } = data;
      dispatch({
        type: DeviceActionTypes.SET_DEVICE,
        payload: {
          ...rest,
          warehouseName: warehouse.name ?? '',
          warrantyNumber: warranty?.warrantyNumber ?? '',
          startWarrantyDate: warranty?.startWarrantyDate ?? null,
          endWarrantyDate: warranty?.endWarrantyDate ?? null,
          provider: warranty?.contractor?.name ?? '',
        },
      });
      dispatch({
        type: DeviceActionTypes.SET_SELECTED_VALUES,
        payload: {
          warehouseName: warehouse?.name ?? '',
          modelName: model?.name ?? '',
          manufacturer: model?.manufacturer?.name ?? '',
          type: model?.type?.name ?? '',
        },
      });
      dispatch({
        type: DeviceActionTypes.SET_MODEL_FIELDS,
        payload: {
          type: model?.type?.slug ?? '',
          manufacturer: model?.manufacturer?.slug ?? '',
        },
      });
      dispatch({
        type: DeviceActionTypes.SET_ITEM_TYPE,
        payload: data.model?.type?.slug ?? '',
      });
      dispatchDeviceData(setDevicePic(data.model.imagePath));
    } catch (error) {
      console.error('Error fetching device:', error);
    }
  }, []);

  const resetModelData = useCallback(() => {
    dispatch({
      type: DeviceActionTypes.SET_DEVICE,
      payload: { modelName: '' },
    });
    dispatch({
      type: DeviceActionTypes.SET_SELECTED_VALUES,
      payload: { modelName: '' },
    });
    dispatchDeviceData(setDevicePic(''));
  }, []);

  return {
    state: {
      isUpdate: state.isUpdate,
      title: state.title,
      fieldType: state.fieldType,
      typeId: state.typeId,
      modelId: state.modelId,
      manufacturerId: state.manufacturerId,
      device: state.device,
      errors: state.errors,
      checked: state.checked,
      selectedValues: state.selectedValues,
      itemType: state.itemType,
      selectedValuesMemo,
      modelFields: state.modelFields,
    },
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
    },
    setters: {
      setIsUpdate: (value: boolean) =>
        dispatch({ type: DeviceActionTypes.SET_IS_UPDATE, payload: value }),
      setFieldType: (value: string) =>
        dispatch({ type: DeviceActionTypes.SET_FIELD_TYPE, payload: value }),
      setDevice: (value: Partial<IDevice>) =>
        dispatch({ type: DeviceActionTypes.SET_DEVICE, payload: value }),
    },
  };
}
