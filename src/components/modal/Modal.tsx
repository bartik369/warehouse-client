import React, {FC} from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark} from '@fortawesome/free-solid-svg-icons';
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
                <div onClick={() => setIsOpen(!isOpen)}>
                    <FontAwesomeIcon className={style.icon} icon={faXmark}/>
                </div>
                {children}
            </div>
        </div>,
        modal
    );
};

export default Modal;