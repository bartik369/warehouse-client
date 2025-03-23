import React, {FC} from 'react';
import ReactDOM from 'react-dom';
import { IoCloseCircleOutline } from 'react-icons/io5';
import style from './Modal.module.scss';

interface IModal {
    children: React.ReactNode;
    isOpen: boolean;
    title?: string;
    setIsOpen:(isOpen:boolean) => void;
}
const Modal:FC<IModal> = ({children, isOpen, title, setIsOpen}) => {
    const modal = document.getElementById('portal') as HTMLElement;
    return ReactDOM.createPortal(
        <div className={style.wrapper}>
            <div className={style.inner}>
                <div className={style.title}>{title}</div>
                <IoCloseCircleOutline
                    tabIndex={0}
                    role="button"
                    className={style.icon} 
                    onClick={() => setIsOpen(!isOpen)}
                    onKeyDown={(e) => { 
                        if (e.key === "Enter" || e.key === " ")setIsOpen(!isOpen) 
                    }}
                />
                {children}
            </div>
        </div>,
        modal
    );
};

export default Modal;   