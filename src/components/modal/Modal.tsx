import React, {FC} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark} from '@fortawesome/free-solid-svg-icons';
import style from './Modal.module.scss';

interface IModal {
    children: React.ReactNode;
    isOpen: boolean;
    setIsOpen:(isOpen:boolean) => void;
    title?: string;
}
const Modal:FC<IModal> = ({children, isOpen, setIsOpen}) => {
    return (
        <div className={style.wrapper}>
            <div className={style.inner}>
                <div onClick={() => setIsOpen(!isOpen)}>
                    <FontAwesomeIcon className={style.icon} icon={faXmark}/>
                </div>
                {children}
            </div>
        </div>
    );
};

export default Modal;