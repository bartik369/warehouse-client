import { ModelValidation, ModelValidationField} from './../../utils/validation/DeviceValidation';
import { useState, useCallback } from "react";
import { IDeviceMedia, IDeviceModel } from "../../types/devices";

export const useAddDeviceModel = () => {
    const [model, setModel] = useState<IDeviceModel>({
        name: '',
        manufacturer: '',
    });
    const [media, setMedia] = useState<IDeviceMedia>({
        file: '',
        prevImg: null,
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleMedia = useCallback((e:React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const objectUrl = URL.createObjectURL(file);
            setMedia({file, prevImg: objectUrl});
            return () => URL.revokeObjectURL(objectUrl);
        }
    }, []);

    const handleCreateModel = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const validationErrors = ModelValidation(model);
        setErrors(validationErrors);
        
        if (Object.keys(validationErrors).length === 0) {
            const formData = new FormData();
            (Object.keys(model) as (keyof IDeviceModel)[]).forEach((key) => {
                const value = model[key];
                if (value !==undefined && value !== null) {
                    formData.append(key, value)
                }
            });
            media.file && formData.append('file', media.file);
        }
        try {   

        } catch (error) {
            console.error(error);
        }
    }, [model]);

    const handleResetModel = useCallback(() => {
        setModel({
            ...model,
            name: '',
            manufacturer: '',
        });
        setMedia({
            ...media,
            file: '',
            prevImg: null,
        });
    }, []);

    const handleInputChange = useCallback((e:React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target as {name: keyof IDeviceModel, value: string};
        const validationErrors = ModelValidationField(name, value);
        setErrors((prev) => ({
            ...prev,
            [name]: validationErrors as string
        }));
        setModel((prev) => ({
            ...prev,
            [name]: value
        }));
    }, []);

    return {
        model, 
        media,
        errors,
        setModel, 
        handleInputChange, 
        handleMedia, 
        handleCreateModel,
        handleResetModel,
    }
};