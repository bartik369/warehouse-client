import React, {FC} from 'react';
import style from './Textarea.module.scss'

interface ITextareaProps {
    value: string;
    label: string;
    errors: Record<string, string>;
    name: string;
    placeholder?: string;
    setText: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const Textarea:FC<ITextareaProps> = ({value, label, errors, name, setText}) => {
    const errorMessage = errors?.[name];
    return (
        <div className={style.wrapper}>
            <div className={style.textarea} tabIndex={0}>
                <div className={style.error}>
                    {errorMessage && 
                    <div className={style.error}>
                        {errorMessage}
                    </div>
                    }
                </div>
                <div className={style.label}>{label}</div>
                <textarea
                    value={value}
                    onChange={(e:React.ChangeEvent<HTMLTextAreaElement>) => setText(e)} 
                    name="" 
                    id="" 
                    rows={6}  
                >
                </textarea>
            </div>
        </div>
    );
};

export default Textarea;