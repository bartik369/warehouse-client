import React, {FC} from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock} from '@fortawesome/free-solid-svg-icons';
import { IValidationDeviceErrors } from '../../../types/devices';
import style from './Input.module.scss';

interface IInputProps {
    onChange:(e:React.ChangeEvent<HTMLInputElement>) => void;
    type: string;
    name?: string;
    value: string;
    placeholder?: string;
    icon?: IconProp;
    label?: string;
    errorTrigger?: string;
    errors: IValidationDeviceErrors;
};
const Input:FC<IInputProps> = ({
    type,
    name,
    value, 
    placeholder, 
    icon, 
    label, 
    errors, 
    errorTrigger, 
    onChange}) => {

    return (
        <div className={style.wrapper}>
            <div className={style.error}>
                {errors[errorTrigger as keyof IValidationDeviceErrors]?.length! > 0 && 
                <div>
                    {errors[errorTrigger as keyof IValidationDeviceErrors]}
                </div>}
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
};

export default Input;