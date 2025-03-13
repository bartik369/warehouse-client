import { useState, useCallback, useMemo, useEffect } from "react";
import { toast } from "react-toastify";
import { useAppSelector } from "../redux/useRedux";
import { IDeviceMedia, IEntity, IDevice, IContractor} from "./../../types/devices";
import { useCreateDeviceMutation } from "../../store/api/devicesApi";
import {FormValidation, ValidateField} from "../../utils/validation/DeviceValidation";
import {isFetchBaseQueryError, isErrorWithMessage} from "../../utils/errors/error-handling";
import { addNewManufacturer, addNewType, addNewModel } from "../../utils/constants/constants";

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
    price_with_vat: null,
    price_without_vat: null,
    residual_price: null,
    warrantyNumber: '',
    startWarrantyDate: null,
    endWarrantyDate:  null,
    provider: '',
    contractorId: '', 
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
  }, [ValidateField]);

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
      
        await create(updatedData).unwrap().then((data) => {
          toast(data?.message, { type: "success" });
          handleResetDevice();
          setMedia((prev) => ({...prev, prevImg: null}));
        });
      } else {
        console.error("Validation errors:", validationErrors);
      }
    } catch (err) {
      if (isFetchBaseQueryError(err)) {
        let errMsg: string;
        if ('error' in err) {
          errMsg = err.error;
        } else {
          if (err.data && typeof err.data === "object" && "message" in err.data) {
            errMsg = (err.data as { message: string }).message;
          } else {
            errMsg = JSON.stringify(err.data);
          }
        }
        toast(errMsg, {type: "error"})
      } else if (isErrorWithMessage(err)) {
        console.error("Unexpected Error:", err.message);
      } else {
        console.error("Unknown Error:", err);
      }
    }
}
    const handleResetDevice = useCallback(() => {
      // Reset device state
      setDevice((prev) => ({
        ...Object.fromEntries(
          Object.entries(prev).map(([key, value]) => {
            if (typeof value === 'string') return [key, ''];
            if (typeof value === 'number') return [key, 0];
            if (typeof value === 'boolean' && key === 'isFunctional') return [key, true];
            if (key === 'startWarrantyDate' || key === 'endWarrantyDate') return [key, null];
            return [key, value];
          })
        ) as IDevice,
      }));
      
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
    }, [device, setDevice]);
    
    const handleInputChange = (<T extends string | IEntity | IContractor>(field: keyof IDevice, value: T) => {
        const validationErrors = ValidateField(field as keyof IDevice, value);
        setErrors((prev) => ({
          ...prev,
          [field]: validationErrors as string
        }));
        const isEntity = (obj: any): obj is IEntity => "slug" in obj;
        const inputValue = typeof value === "string" 
          ? value 
          : isEntity(value) 
          ? value.slug 
          : "";
        const selectValue = typeof value === 'string' ? value : value.name;

        setDevice((prev) => ({
          ...prev,
          [field]: inputValue,
        }));

        setSelectedValues((prev) => ({
          ...prev,
          [field]: selectValue,
        }));
    });

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

    const handleContractorChange = useCallback((item: IContractor) => {
      handleInputChange("contractorId", item.id || '')
      handleInputChange("provider", item.name || '')
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
      handleTypeChange, handleManufacturerChange, handleWarehouseChange, handleContractorChange
    };
}
