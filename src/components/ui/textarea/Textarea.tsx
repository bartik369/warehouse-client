import React, {FC} from 'react';
import style from './Textarea.module.scss'

interface ITextareaProps {
    setText: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    value: string;
    label: string;
}

const Textarea:FC<ITextareaProps> = ({setText, value, label}) => {
    return (
        <div className={style.textarea}>
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
    );
};

export default Textarea;