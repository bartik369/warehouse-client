import React, { memo } from 'react';
import style from './Input.module.scss';

interface IInputProps {
    onChange:(e:React.ChangeEvent<HTMLInputElement>) => void;
    type: string;
    name: string;
    value: string;
    placeholder?: string;
    label?: string;
    errors: Record<string, string>;
};
const Input = memo(({
    type,
    name,
    value, 
    placeholder, 
    label,
    errors,
    onChange }:IInputProps) => {
    const errorMessage = errors?.[name];

    return (
        <div className={style.wrapper}>
            <div className={style.input}>
            <input 
                name={name} 
                value={value}   
                type={type}
                onChange={onChange}
                placeholder={placeholder} 
                className={style.input} 
                tabIndex={0} 
            />
             <div className={style.label}>{label}</div>
            </div>
            {errorMessage && 
            <div className={style.error}>
                <div className={style.error}>
                    {errorMessage}
                </div>
            </div>
            }
        </div>
    );
});

export default Input;