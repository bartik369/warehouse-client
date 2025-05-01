import React from 'react';
import style from './Textarea.module.scss'

interface ITextareaProps {
    value: string;
    label: string;
    errors: Record<string, string>;
    name: string;
    placeholder?: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const Textarea = ({ value, label, errors, name, onChange }:ITextareaProps) => {
    const errorMessage = errors?.[name];
    return (
        <div className={style.wrapper}>
            <div className={style.textarea} tabIndex={0}>
                <div className={style.label}>{label}</div>
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
            <div className={style.error}>
                <div className={style.error}>
                    {errorMessage}
                </div>
            </div>
            }
        </div>
    );
};

export default Textarea;