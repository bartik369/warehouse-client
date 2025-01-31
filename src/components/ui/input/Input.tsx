import React, {FC, memo} from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import style from './Input.module.scss';

interface IInputProps {
    onChange:(e:React.ChangeEvent<HTMLInputElement>) => void;
    type: string;
    name: string;
    value: string;
    placeholder?: string;
    icon?: IconProp;
    label?: string;
    errors: Record<string, string>;
};
const Input:FC<IInputProps> = memo(({
    type,
    name,
    value, 
    placeholder, 
    icon, 
    label, 
    errors,
    onChange}) => {
    const errorMessage = errors?.[name];
    return (
        <div className={style.wrapper}>
            <div className={style.error}>
                {errorMessage && errorMessage}
            </div>
         <div className={style.input}>
               <div className={style.label}>{label}</div>
               {icon && <FontAwesomeIcon icon={icon} className={style.icon} /> }
                <input 
                    name={name}
                    value={value} 
                    type={type} 
                    onChange={onChange}
                    placeholder={placeholder}
                />
        </div>
        </div>
    );
});

export default Input;