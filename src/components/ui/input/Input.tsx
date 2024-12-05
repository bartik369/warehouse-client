import React, {FC} from 'react';
import style from './Input.module.scss';

interface IInputProps {
    onChange:(e:React.ChangeEvent<HTMLInputElement>) => void;
    type: string;
    value: string;
    placeholder: string;
    icon?: React.ReactElement;
    label?: string
};
const Input:FC<IInputProps> = ({type, value, placeholder, onChange, icon, label}) => {
    return (
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
    );
};

export default Input;