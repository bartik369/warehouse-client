import { IDeviceMedia} from "./../../types/devices";
import { useState, ChangeEvent, useCallback } from "react";
import { useCreateDeviceMutation } from "../../store/api/devicesApi";
import {FormValidation, ValidateField} from "../../utils/validation/DeviceValidation";
import {
  isFetchBaseQueryError,
  isErrorWithMessage,
} from "../../helpers/error-handling";
import { IDevice } from "../../types/devices";

export function useAddDevice() {
  const [device, setDevice] = useState<IDevice>({
    name: "",
    inventoryNumber: "",
    type: "",
    manufacturer: "",
    modelCode: "",
    modelId: "",
    serialNumber: "",
    media: "",
    weight: 0,
    screenSize: 0,
    memorySize: 0,
    inStock: true,
    isFunctional: true,
    isAssigned: false,
    warehouseId: "",
    description: "",
    addedById: "",
    updatedById: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(true);
  const [media, setMedia] = useState<IDeviceMedia>({
    file:    null,
    prevImg: null,
  });
  const [selectedOption, setSelectedOption] = useState({
    id: null,
    name: "",
  });
  const [itemType, setItemType] = useState<string>("");
  const [selectedValues, setSelectedValues] = useState<{[key: string]: string}>({});
  const [create] = useCreateDeviceMutation();

  const handleMedia = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const objectUrl = URL.createObjectURL(file);
      setMedia({ file, prevImg: objectUrl});
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, []);

  const handleNumber = useCallback((num: number) => {
    setDevice((prev) => ({
      ...prev,
      weight: num,
    }));
  }, []);

  const handleExtNumber = useCallback((num: number, fieldName: string) => {
    setDevice((prev) => ({
      ...prev,
      [fieldName]: num,
    }));
    const data = ValidateField(fieldName, num);
    setErrors((prev) => ({
      ...prev,
      [fieldName]: data as string,
    }));
  }, []);

  const handleAddDevice = async () => {
    try {
      const validationErrors = FormValidation(device, itemType);
      setErrors(validationErrors as Record<string, string>);

      if (Object.keys(validationErrors).length === 0) {
        const formData = new FormData();
        (Object.keys(device) as (keyof IDevice)[]).forEach((key) => {
          const value = device[key];
          if (value !== undefined && value !== null) {
            formData.append(key, value instanceof Date 
                ? value.toISOString() 
                : value.toString()
            );
          }
        });
        media.file && formData.append("file", media.file);
        await create(formData).unwrap();
        handleResetDevice();
        setMedia({...media, prevImg: null});
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
    const handleResetDevice = useCallback(() => {
      setDevice({
        name: "",
        inventoryNumber: "",
        type: "",
        manufacturer: "",
        modelCode: "",
        modelId: "",
        serialNumber: "",
        media: "",
        weight: 0,
        screenSize: 0,
        memorySize: 0,
        inStock: true,
        isFunctional: true,
        isAssigned: false,
        warehouseId: "",
        description: "",
        addedById: "",
        updatedById: "",
      });
      setSelectedValues({});
      setErrors({
        name: "",
        type: "",
        manufacturer: "",
        warehouseId: "",
        description: "",
        weight: "",
        screenSize: "",
        memorySize: "",
      });
      setItemType("");
      setMedia({...media, prevImg: null});
    }, []);

    const handleUpdateDevice = useCallback((field: keyof IDevice, value: any) => {
      setDevice((prev) => ({
        ...prev,
        [field]: value,
      }));

      setSelectedValues((prev) => ({
        ...prev,
        [field]: value,
      }));

      const validationErrors = ValidateField(field, value);
      setErrors((prev) => ({
        ...prev,
        [field]: validationErrors as string,
      }));
    }, []);

    const handleChecked = useCallback(() => {
      setChecked(!checked);
      setDevice((prev) => ({
        ...prev,
        isFunctional: !checked,
      }))
    }, [checked]);

    return { errors, checked, device, media, itemType, selectedOption, selectedValues,
      handleChecked, setItemType, handleUpdateDevice, handleMedia, handleNumber, handleExtNumber,
      handleAddDevice, handleResetDevice, setSelectedOption,
    };
}
