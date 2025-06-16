import React, { memo } from 'react';
import { MdOutlineErrorOutline } from "react-icons/md";
import styles from './Input.module.scss';

interface InputProps {
    onChange:(e:React.ChangeEvent<HTMLInputElement>) => void;
    type: string;
    name: string;
    value: string;
    placeholder?: string;
    label?: string;
    errors: Record<string, string>;
    variant?: string;
    icon?: React.ReactNode;
};
const Input = memo(({
    type,
    name,
    value, 
    placeholder, 
    label,
    errors,
    variant,
    icon,
    onChange }:InputProps) => {
    const errorMessage = errors?.[name];

    return (
        <div className={styles.wrapper}>
            <div className={`${styles.input} ${variant ? styles[variant] : ""} ${errorMessage ? styles.inputError : ''}`}>
            {icon && <span className={styles.icon}>{icon}</span>}
            <input 
                name={name} 
                value={value}   
                type={type}
                onChange={onChange}
                placeholder={placeholder} 
                className={styles.input} 
                tabIndex={0} 
            />
             <div className={styles.label}>{label}</div>
            </div>
            {errorMessage && 
            <div className={styles.errorIcon} data-tooltip={errorMessage}>
                <MdOutlineErrorOutline />
            </div>
            }
        </div>
    );
});

export default Input;