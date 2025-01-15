import { IDeviceMedia, DeviceFormData } from "./../../types/devices";
import { useState, ChangeEvent, useCallback } from "react";
import { useCreateDeviceMutation } from "../../store/api/devicesApi";
import {
  DeviceFormValidation,
  DeviceValidateField,
} from "../../utils/validation/DeviceValidation";
import {
  isFetchBaseQueryError,
  isErrorWithMessage,
} from "../../helpers/error-handling";
import { IDevice } from "../../types/devices";

export function useAddDevice() {
  const [device, setDevice] = useState<IDevice>({
    name: "",
    serialNumber: "",
    modelCode: "",
    inventoryNumber: "",
    type: "",
    weight: 0,
    screenSize: 0,
    memorySize: 0,
    serviceable: true,
    media: "",
    location: "",
    manufacturer: "",
    inStock: true,
    description: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(true);
  const [media, setMedia] = useState<IDeviceMedia>({
    file: "",
    prevImg: null,
  });
  const [selectedOption, setSelectedOption] = useState({
    id: null,
    name: "",
  });
  const [itemType, setItemType] = useState<string>("");
  const [selectedValues, setSelectedValues] = useState<{[key: string]: string;}>({});
  const [create] = useCreateDeviceMutation();

  const mediaHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const objectUrl = URL.createObjectURL(file);
      setMedia({ file, prevImg: URL.createObjectURL(file) });
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, []);

  const numberHandler = useCallback((num: number) => {
    setDevice((prev) => ({
      ...prev,
      weight: num,
    }));
  }, []);

  const extNumberHandler = useCallback((num: number, fieldName: string) => {
    setDevice((prev) => ({
      ...prev,
      [fieldName]: num,
    }));
    const data = DeviceValidateField(fieldName, num);
    setErrors((prev) => ({
      ...prev,
      [fieldName]: data as string,
    }));
  }, []);

  const addDeviceHandler = async () => {
    try {
      const validationErrors = DeviceFormValidation(device, itemType);
      setErrors(validationErrors as Record<string, string>);

      if (Object.keys(validationErrors).length === 0) {
        const formData = new FormData();

        (Object.keys(device) as (keyof IDevice)[]).forEach((key) => {
          const value = device[key];
          if (value !== undefined && value !== null) {
            formData.append(
              key,
              value instanceof Date ? value.toISOString() : value.toString()
            );
          }
        });
        media.file && formData.append("file", media.file);
        await create(formData).unwrap();
      } else {
        console.error("Validation errors:", validationErrors);
      }
    } catch (err) {
      if (isFetchBaseQueryError(err)) {
        const errMsg = "error" in err ? err.error : JSON.stringify(err.data);
        console.log("API Error:", errMsg);
      } else if (isErrorWithMessage(err)) {
        console.error("Unexpected Error:", err.message);
      } else {
        console.error("Unknown Error:", err);
      }
    }
}
    const resetDeviceHandler = useCallback(() => {
      setDevice({
        name: "",
        serialNumber: "",
        modelCode: "",
        inventoryNumber: "",
        type: "",
        weight: 0,
        screenSize: 0,
        memorySize: 0,
        serviceable: true,
        media: "",
        location: "",
        manufacturer: "",
        inStock: true,
        description: "",
      });
      setSelectedValues({});
      setErrors({
        name: "",
        type: "",
        manufacturer: "",
        serviceable: "",
        description: "",
        location: "",
        weight: "",
        screenSize: "",
        memorySize: "",
      });
      setItemType("");
    }, []);

    const updateDevice = useCallback((field: keyof IDevice, value: any) => {
      setDevice((prev) => ({
        ...prev,
        [field]: value,
      }));

      setSelectedValues((prev) => ({
        ...prev,
        [field]: value,
      }));

      const validationErrors = DeviceValidateField(field, value);
      setErrors((prev) => ({
        ...prev,
        [field]: validationErrors as string,
      }));
    }, []);

    return { errors, checked, device, media, itemType, selectedOption, selectedValues,
      setChecked, setItemType, updateDevice, mediaHandler, numberHandler, extNumberHandler,
      addDeviceHandler, resetDeviceHandler, setSelectedOption,
    };
}
