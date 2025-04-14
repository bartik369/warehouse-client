import { useCallback, useState } from "react";
import { IRole } from "../../types/access";

export const usePermission = () => {
    const [entity, setEntity] = useState<IRole>({
        name: '',
        comment: ''
    });
    const [isUpdate, setIsUpdate] = useState(false);

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleInputChange = useCallback((name: keyof IRole, e: string) => {
        console.log(field);
        console.log(value);
        
    }, [])
    const handleGetEntity = useCallback((id: string, field: string) => {
    
    }, [])
    const handleCreateEntity = useCallback(() => {
    
    }, [])
    const handleDeleteEntity = useCallback(() => {
    
    }, [])
    const handleResetEntity = useCallback(() => {
    
    }, [])
    
    return  { 
        entity,
        errors,
        isUpdate,
        handleInputChange, 
        handleGetEntity,
        handleCreateEntity,
        handleDeleteEntity,
        handleResetEntity,
     }
}
