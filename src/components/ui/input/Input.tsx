import React, {FC} from 'react';
import { IValidationDeviceErrors } from '../../../types/devices';
import style from './Input.module.scss';

interface IInputProps {
    onChange:(e:React.ChangeEvent<HTMLInputElement>) => void;
    type: string;
    value: string;
    placeholder?: string;
    icon?: React.ReactElement;
    label?: string;
    errorTrigger: string;
    errors: IValidationDeviceErrors;
};
const Input:FC<IInputProps> = ({type, value, placeholder, onChange, icon, label, errors, errorTrigger}) => {

    return (
        <div className={style.wrapper}>
            <div className={style.error}>
                {errors[errorTrigger as keyof IValidationDeviceErrors]?.length! > 0 && 
                <div>{errors[errorTrigger as keyof IValidationDeviceErrors]}</div>}
            </div>
         <div className={style.input}>
               <div className={style.label}>{label}</div>
               { icon && <div className={style.icon}>{icon}</div> }
                <input 
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