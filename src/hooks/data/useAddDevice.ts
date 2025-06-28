import { useCallback } from "react";
import { useLocation } from "react-router-dom";
import {
  resetDevice,
  resetDevicePic,
  resetError,
  setChecked,
  setDevicePic,
  setFieldType,
  setIsUpdate,
  setItemType,
  setTitle,
} from "../../store/slices/deviceSlice";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../redux/useRedux";
import { RootState } from "../../store/store";
import {
  useCreateDeviceMutation,
  useLazyGetDeviceQuery,
  useUpdateDeviceMutation,
} from "../../store/api/devicesApi";
import {
  setDevice,
  updateDevice,
  setError,
} from "../../store/slices/deviceSlice";
import {
  FormValidation,
  ValidateField,
} from "../../utils/validation/DeviceValidation";
import { handleApiError } from "../../utils/errors/handleApiError";
import { Contractor } from "../../types/content";
import { Entity, Device } from "./../../types/devices";

export function useAddDevice() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const currentDevice = useAppSelector((state:RootState) => state.device.device);
  const currentItemType = useAppSelector((state:RootState) => state.device.itemType);
  const currentChecked = useAppSelector((state:RootState) => state.device.checked);

  const locationPath = useLocation();
  const exceptionPath = /add-device$/.test(locationPath.pathname);

  const [createDevice] = useCreateDeviceMutation();
  const [getDevice] = useLazyGetDeviceQuery();
  const [updateDeviceData] = useUpdateDeviceMutation();

  const handleNumber = useCallback(
    (num: number) => {
      dispatch(setDevice({ device: { ...currentDevice, weight: num } }));
    },
    [currentDevice, dispatch]
  );

  const handleExtNumber = useCallback((num: number, fieldName: string) => {
    const data = ValidateField(fieldName, num);
    dispatch(setDevice({ device: { ...currentDevice, [fieldName]: num } }));
    dispatch(setError({ [fieldName]: data as string }));
  }, [dispatch, currentDevice]);

  const handleResetDevice = useCallback(() => {
    dispatch(resetDevice());
    dispatch(resetError());
    dispatch(resetDevicePic());
  }, [dispatch]);

  const handleAddDevice = useCallback(async () => {
    try {
      const validationErrors = FormValidation(currentDevice, currentItemType);
      dispatch(setError(validationErrors as Record<string, string>));

      if (Object.keys(validationErrors).length === 0) {
        if (!user) return;
        const updatedData = {
          ...currentDevice,
          addedById: user.id,
          updatedById: user.id,
        };
        if (exceptionPath) {
          const data = await createDevice(updatedData).unwrap();
          if (data) {
            toast(data?.message, { type: "success" });
            handleResetDevice();
          }
        } else {
          const data = await updateDeviceData(updatedData).unwrap();
          if (data) {
            toast(data?.message, { type: "success" });
            handleResetDevice();
          }
        }
      } else {
        console.error("Validation errors:", validationErrors);
      }
    } catch (err) {
      handleApiError(err);
    }
  }, [
    currentDevice,
    currentItemType,
    user,
    exceptionPath,
    createDevice,
    updateDevice,
    dispatch,
    handleResetDevice,
  ]);

  const handleInputChange = useCallback(
    <T extends string | Entity | Contractor>(field: keyof Device, value: T) => {
      const validationErrors = ValidateField(field as keyof Device, value);
      dispatch(setError({ [field]: validationErrors as string }));
      const isEntity = (obj: any): obj is Entity => "slug" in obj;
      const inputValue =
        typeof value === "string" ? value : isEntity(value) ? value.slug : "";
      dispatch(updateDevice({ field, value: inputValue }));
    },
    []
  );

  const handleChecked = useCallback(() => {
    dispatch(setChecked(!currentChecked));
    dispatch(updateDevice({ field: "isFunctional", value: !currentChecked }));
  }, [currentChecked]);

  const handleTypeChange = useCallback(
    (item: Entity) => {
      console.log(item);
      handleInputChange("typeSlug", item.slug || "");
      handleInputChange("typeName", item.name || "");
      handleInputChange("typeId", item.id || "");
    },
    [handleInputChange]
  );

  const handleModelChange = useCallback(
    (item: Entity) => {
      handleInputChange("modelName", item.name || "");
      handleInputChange("modelSlug", item.slug || "");
      handleInputChange("modelId", item.id || "");
    },
    [handleInputChange]
  );

  const handleManufacturerChange = useCallback(
    (item: Entity) => {
      handleInputChange("manufacturerName", item.name);
      handleInputChange("manufacturerSlug", item.slug || "");
      handleInputChange("manufacturerId", item.id || "");
    },
    [handleInputChange]
  );

  const handleWarehouseChange = useCallback(
    (item: Entity) => {
      handleInputChange("warehouseId", item.id || "");
      handleInputChange("warehouseName", item.name || "");
      handleInputChange("warehouseSlug", item.slug || "");
    },
    [handleInputChange]
  );

  const handleContractorChange = useCallback(
    (item: Contractor) => {
      handleInputChange("contractorId", item.id || "");
      handleInputChange("providerName", item.name || "");
      handleInputChange("providerSlug", item.slug || "");
    },
    [handleInputChange]
  );
  const handleStartDateChange = (item: Date | null) => {
    dispatch(updateDevice({ 
      field: "startWarrantyDate", 
      value: item ? item.toString() : null 
    }));
  };
  const handleEndDateChange = (item: Date | null) => {
    dispatch(updateDevice({ 
      field: "endWarrantyDate", 
      value: item ? item.toISOString() : null 
    }));
  };

  const handleGetDevice = useCallback(
    async (id: string) => {
      try {
        if (!id) return;
        dispatch(setIsUpdate(true));
        const data = await getDevice(id).unwrap();
        const { warehouse, model, warranty, ...rest } = data;
        dispatch(
          setDevice({
            device: {
              ...rest,
              warehouseName: warehouse.name ?? "",
              warehouseSlug: warehouse.slug ?? "",
              providerName: warranty?.contractor?.name ?? "",
              providerSlug: warranty?.contractor?.slug ?? "",
              contractorId: data.contractorId ?? "",
              manufacturerName: model?.manufacturer?.name ?? "",
              manufacturerSlug: model?.manufacturer?.slug ?? "",
              typeName: model?.type.name ?? "",
              typeSlug: model?.type.slug ?? "",
              price_with_vat: Number(data.price_with_vat ?? 0),
              price_without_vat: Number(data.price_without_vat ?? 0),
              residual_price: Number(data.residual_price ?? 0),
              warrantyNumber: warranty?.warrantyNumber ?? "",
              startWarrantyDate: warranty?.startWarrantyDate ?? null,
              endWarrantyDate: warranty?.endWarrantyDate ?? null,
              modelName: model?.name ?? "",
            },
          })
        );
        dispatch(setItemType(data.model?.type?.slug ?? ""));
        dispatch(setDevicePic(data.model.imagePath));
      } catch (err: unknown) {
        handleApiError(err);
      }
    },
    [dispatch, getDevice]
  );

  const resetModelData = useCallback(() => {
    dispatch(updateDevice({ field: "modelName", value: "" }));
    dispatch(setDevicePic(""));
  }, [dispatch]);

  const handleSetTitle = useCallback(
    (item: string) => {
      dispatch(setTitle(item));
    },
    [dispatch]
  );

  const handleSetType = useCallback(
    (item: string) => {
      dispatch(setFieldType(item));
    },
    [dispatch]
  );

  return {
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
  };
}
