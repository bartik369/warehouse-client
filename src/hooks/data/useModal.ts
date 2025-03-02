import { useState} from "react";

export const useModal = (initialState: boolean) => {
    const [isOpen, setIsOpen] = useState(initialState);
    const [fieldType, setFieldType] = useState('');
    const [entity, setEntity] = useState('');
    
    return {isOpen, fieldType, entity, setEntity, setFieldType, setIsOpen}
}