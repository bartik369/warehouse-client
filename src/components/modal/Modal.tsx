import React, {FC} from 'react';
import ReactDOM from 'react-dom';
import { IoCloseCircleOutline } from 'react-icons/io5';
import modalStyles from './Modal.module.scss';

interface IModal {
    children: React.ReactNode;
    isOpen: boolean;
    title?: string;
    maxWidth?: number;
    setIsOpen:(isOpen:boolean) => void;
}
const Modal:FC<IModal> = ({ children, isOpen, title, maxWidth, setIsOpen }) => {
    const modal = document.getElementById('portal') as HTMLElement;
    return ReactDOM.createPortal(
        <div className={modalStyles.wrapper}>
            <div className={modalStyles.inner} style={{ maxWidth: maxWidth ? `${maxWidth}px` : 'auto' }}>
                <div className={modalStyles.title}>{title}</div>
                {children}
            </div>
            <IoCloseCircleOutline
                    tabIndex={0}
                    role="button"
                    className={modalStyles.icon} 
                    onClick={() => setIsOpen(!isOpen)}
                    onKeyDown={(e) => { 
                        if (e.key === "Enter" || e.key === " ")setIsOpen(!isOpen) 
                    }}
                />
        </div>,
        modal
    );
};

export default Modal;   