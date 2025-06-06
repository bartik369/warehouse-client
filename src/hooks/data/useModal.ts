import { useState} from 'react';

export const useModal = (initialState: boolean) => {
    const [isOpen, setIsOpen] = useState(initialState);
    const [fieldType, setFieldType] = useState('');
    
    return {isOpen, fieldType, setFieldType, setIsOpen}
}