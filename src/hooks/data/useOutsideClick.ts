import { useEffect, useState,useRef } from 'react';

export function useOutsideClick<T extends HTMLDivElement>() {
    const [isOpen, setIsOpen] = useState(false);
    const modalRef = useRef<T | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                closeModalHandler();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const openModalHandler = () => {
        setIsOpen(!isOpen);
    };
    const closeModalHandler = () => {
        setIsOpen(false);
    };


    return { isOpen, openModalHandler, modalRef };
}