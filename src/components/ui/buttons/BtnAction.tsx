import React, {FC} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import style from './Buttons.module.scss';

interface IButtonProps {
    icon?: IconProp;
    size: 'sm' | 'md' | 'lg';
    color: string;
    type?: 'submit' | 'button' | 'reset';
    title: string;
    click:(e: React.MouseEvent<HTMLButtonElement>) => void;
};

const BtnAction:FC<IButtonProps> = ({icon, size, type, title, color, click}) => {
    return (
        <>
            <button 
                onClick={click} 
                type={type} 
                className={`${style[size]} ${style[color]}`}
            >
                {icon && 
                    <FontAwesomeIcon className={style.icon} icon={icon} />
                }
                <p>{title}</p>
            </button>
        </>
    );
};

export default BtnAction;