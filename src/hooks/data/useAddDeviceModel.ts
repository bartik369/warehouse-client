import { useState, useCallback } from "react";
import { IDevice, IDeviceMedia } from "../../types/devices";

export const useAddDeviceModel = () => {
    const [model, setModel] = useState<Pick<IDevice, 'name' | 'manufacturer'>>({
        name: '',
        manufacturer: '',
    });
    const [media, setMedia] = useState<IDeviceMedia>({
        file: '',
        prevImg: null,
    });

    const handleMedia = useCallback((e:React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const objectUrl = URL.createObjectURL(file);
            setMedia({file, prevImg: objectUrl});
            return () => URL.revokeObjectURL(objectUrl);
        }
    }, []);

    const handleCreateModel = useCallback(async () => {
        try {
            
        } catch (error) {
            
        }
    },[])
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
        const {name, value} = e.target;
        setModel((prev) => ({
            ...prev,
            [name]: value
        }));
    }, []);

    return {
        model, 
        media, 
        setModel, 
        handleInputChange, 
        handleMedia, 
        handleCreateModel,
        handleResetModel,
    }
};