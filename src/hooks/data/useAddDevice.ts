import { IDeviceMedia, IEntity} from "./../../types/devices";
import { useState, useCallback, useMemo, useEffect } from "react";
import { useAppSelector } from "../redux/useRedux";
import { useCreateDeviceMutation } from "../../store/api/devicesApi";
import {FormValidation, ValidateField} from "../../utils/validation/DeviceValidation";
import {isFetchBaseQueryError, isErrorWithMessage} from "../../helpers/error-handling";
import { addNewManufacturer, addNewType, addNewModel } from "../../utils/constants/constants";
import { IDevice} from "../../types/devices";

export function useAddDevice() {
  const user = useAppSelector((state) => state.auth.user);
  const [typeId, setTypeId] = useState(''); // For display select of model 
  const [manufacturerId, setManufacturerId] = useState(''); // For display select of model 
  const [modelId, setModelId] = useState('');
  const [title, setTitle] = useState('');
  const [fieldType, setFieldType] = useState('');
  const [device, setDevice] = useState<IDevice>({
    name: '',
    inventoryNumber: '',
    modelId: '',
    modelName: '',
    modelCode: '',
    serialNumber: '',
    weight: 0,
    screenSize: 0,
    memorySize: 0,
    inStock: true,
    isFunctional: true,
    isAssigned: false,
    warehouseId: '',
    warehouseName: '',
    description: '',
    type: '',
    typeId: '',
    manufacturer: '',
    addedById:'',
    updatedById: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(true);
  const [devicePic, setDevicePic] = useState(""); // Preview of device model
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
  const handleNumber = useCallback((num: number) => {
    setDevice((prev) => ({
      ...prev,
      weight: num,
    }));
  }, []);

  const handleExtNumber = useCallback((num: number, fieldName: string) => {
    const data = ValidateField(fieldName, num);
    setDevice((prev) => ({
      ...prev,
      [fieldName]: num,
    }));
    setErrors((prev) => ({
      ...prev,
      [fieldName]: data as string,
    }));
  }, []);

  const handleAddDevice = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const validationErrors = FormValidation(device, itemType);
      setErrors(validationErrors as Record<string, string>);
      if (Object.keys(validationErrors).length === 0) {

        if (!user) return;
        const updatedData = {
          ...device,
          addedById: user.id,
          updatedById: user.id
        };
        console.log( 'update', updatedData)
        await create(updatedData).unwrap();
        handleResetDevice();
        setMedia((prev) => ({...prev, prevImg: null}));
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
      // Reset device state
      setDevice((prev) => 
        Object.fromEntries(
          Object.entries(prev).map(([key, value]) => {
            if (typeof value === 'string') return [key, ''];
            if (typeof value === 'number') return [key, 0];
            if (typeof value === 'boolean' && key === 'isFunctional') return [key, true]
            return [key, value];
          })
        ) as IDevice
      );
      // Reset errors state
      setErrors((prev) => 
      Object.fromEntries(
        Object.entries(prev).map(([key, value]) => {
          if (typeof value === 'string') return [key, ''];
          return [key, value];
        })
      ) as Record<string, string>
      );
      setSelectedValues({});
      setManufacturerId('');
      setTypeId('');
      setDevicePic('');
      setItemType('');
      setMedia((prev) => ({...prev, prevImg: null}));
    }, []);

    const handleInputChange = useCallback(
      <T extends string | IEntity>(field: keyof IDevice, value: T) => {
        const validationErrors = ValidateField(field, value);
        setErrors((prev) => ({
          ...prev,
          [field]: validationErrors as string
        }));
        const inputValue = typeof value === 'string' ? value : value.slug;
        const selectValue = typeof value === 'string' ? value : value.name;

        setDevice((prev) => ({
          ...prev,
          [field]: inputValue,
        }));

        setSelectedValues((prev) => ({
          ...prev,
          [field]: selectValue,
        }));
    }, []);

    const handleChecked = useCallback(() => {
      setChecked(!checked);
      setDevice((prev) => ({
        ...prev,
        isFunctional: !checked,
      }))
    }, [checked]);
    
    // Memoization of  device form fields (select)
    const selectedValuesMemo = useMemo(() => selectedValues, [selectedValues]);
    const handleTypeChange = useCallback((item: IEntity) => {
      handleInputChange("type", item);
      handleInputChange("typeId", item.id || '');
      setItemType(item.slug);
      setTypeId(item.id || '')
    }, [handleInputChange, setItemType, setTypeId]);
  
    const handleModelChange = useCallback((item: IEntity) => {
      handleInputChange("modelName", item.name || '');
      handleInputChange("modelId", item.id || '');
      setModelId(item.id || '');
    }, [handleInputChange, setModelId]);
  
    const handleManufacturerChange = useCallback((item: IEntity) => {
      handleInputChange("manufacturer", item);
      setManufacturerId(item.id || '')
    }, [handleInputChange, setManufacturerId]);
    
    const handleWarehouseChange = useCallback((item: IEntity) => {
      handleInputChange("warehouseId", item.id || '')
      handleInputChange("warehouseName", item.name || '')
    }, [handleInputChange]);

    useEffect(() => {
      switch(fieldType) {
        case 'manufacturer':
          setTitle(addNewManufacturer);
          break
        case 'type':
          setTitle(addNewType);
          break
        case 'model':
          setTitle(`${addNewModel} (${selectedValues["type"]})`)
          break
      }
    }, [fieldType]);

    return {title, fieldType,  selectedValuesMemo, typeId, modelId, manufacturerId, device, 
      errors, checked, media, devicePic, itemType, selectedOption, selectedValues, setTypeId, 
      setFieldType, setTitle, setModelId, setSelectedValues, setManufacturerId, setDevicePic,
      setMedia, handleChecked, setItemType, handleInputChange, handleNumber, handleExtNumber,
      handleAddDevice, handleResetDevice, setDevice,  setSelectedOption,handleModelChange, 
      handleTypeChange, handleManufacturerChange, handleWarehouseChange
    };
}
