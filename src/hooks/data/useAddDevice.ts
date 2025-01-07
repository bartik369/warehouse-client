import { useState, ChangeEvent, useCallback } from "react";
import { DeviceFormValidation, DeviceValidateField } from "../../utils/validation/DeviceValidation";
import { IDevice, IValidationDeviceErrors } from "../../types/devices";

export function useAddDevice() {
    const [device, setDevice] = useState<IDevice>({
        name: '',
        serialNumber: '',
        modelCode: '',
        inventoryNumber: '',
        type: '',
        weight: 0,
        screenSize: 0,
        memorySize: 0,
        serviceable: true,
        media: '',
        location: '',
        manufacturer: '',
        inStock: true,
        description: ''
    });
    const [errors, setErrors] = useState<IValidationDeviceErrors>({});
    const [checked, setChecked] = useState(true);
    
    const [media, setMedia] = useState<{file: Blob | string, prevImg: string | null}>({
        file: '',
        prevImg: null,
    });
    const [selectedOption, setSelectedOption] = useState({
        id: null,
        name: ''
    });
    const [itemType, setItemType] = useState<string>('');
    const [selectedValues, setSelectedValues] = useState<{[key: string]: string}>({});

    const mediaHandler = useCallback((e:ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const objectUrl = URL.createObjectURL(file)
            setMedia({file, prevImg: URL.createObjectURL(file)});
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
            [fieldName]: data
        }));
    }, []);

    const addDeviceHandler = async() => {
        try {
           const validationErrors = DeviceFormValidation(device, itemType);
           setErrors(validationErrors);

           if (Object.keys(validationErrors).length === 0) {
               console.log('ok');       
           } else {
               console.log('there is error');
           }
        } catch (error) {
            
        }
    }
    const resetDeviceHandler = useCallback(() => {
        setDevice({
            name: '',
            serialNumber: '',
            modelCode: '',
            inventoryNumber: '',
            type: '',
            weight: 0,
            screenSize: 0,
            memorySize: 0,
            serviceable: true,
            media: '',
            location: '',
            manufacturer: '',
            inStock: true,
            description: ''
        });
        setSelectedValues({});
        setErrors({
            name: '',
            type: '',
            manufacturer: '',
            serviceable: '',
            description: '',
            location: '',
            weight: '',
            screenSize: '',
            memorySize: '',
        })
        setItemType('');
    }, []);

    const updateDevice = useCallback((field: keyof IDevice, value: any) => {
        setDevice((prev) => ({
            ...prev,
            [field]: value
        }));
        setSelectedValues((prev) => ({
            ...prev,
            [field]: value,
        }));
        const data = DeviceValidateField(field, value);
        setErrors((prev) => ({
            ...prev,
            [field]: data
        }));
    }, []);

    return {
        checked,
        device, 
        media,
        itemType, 
        selectedOption,
        selectedValues,
        setChecked,
        setItemType,
        updateDevice,
        mediaHandler, 
        numberHandler, 
        extNumberHandler,
        addDeviceHandler,
        resetDeviceHandler,
        setSelectedOption,
        errors,
    }
}
