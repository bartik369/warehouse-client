import React, { memo } from 'react';
import styles from './Input.module.scss';

interface IInputProps {
    onChange:(e:React.ChangeEvent<HTMLInputElement>) => void;
    type: string;
    name: string;
    value: string;
    placeholder?: string;
    label?: string;
    errors: Record<string, string>;
    variant?: string;
};
const Input = memo(({
    type,
    name,
    value, 
    placeholder, 
    label,
    errors,
    variant,
    onChange }:IInputProps) => {
    const errorMessage = errors?.[name];

    return (
        <div className={styles.wrapper}>
            <div className={`${styles.input} ${variant ? styles[variant] : ""}`}>
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
            <div className={styles.error}>
                <div className={styles.error}>
                    {errorMessage}
                </div>
            </div>
            }
        </div>
    );
});

export default Input;