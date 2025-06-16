import React, { memo } from 'react';
import { MdOutlineErrorOutline } from "react-icons/md";
import styles from './Textarea.module.scss'

interface TextareaProps {
    value: string;
    label: string;
    errors: Record<string, string>;
    name: string;
    placeholder?: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const Textarea = memo(({ value, label, errors, name, onChange }:TextareaProps) => {
    const errorMessage = errors?.[name];
    return (
        <div className={styles.wrapper}>
            <div className={`${styles.textarea} ${errorMessage ? styles.inputError : ''}`}
                tabIndex={0}>
                <div className={styles.label}>{label}</div>
                <textarea
                    value={value}
                    onChange={(e:React.ChangeEvent<HTMLTextAreaElement>) => onChange(e)} 
                    name="" 
                    id="" 
                    rows={6}  
                >
                </textarea>
            </div>
            {errorMessage && 
            <div className={styles.errorIcon} data-tooltip={errorMessage}>
                <MdOutlineErrorOutline />
            </div>
            }
        </div>
    );
});

export default Textarea;