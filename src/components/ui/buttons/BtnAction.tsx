import {FC} from 'react';
import style from './Buttons.module.scss';

interface IButtonProps {
    type?: 'submit' | 'button' | 'reset';
    title: string;
};

const BtnAction:FC<IButtonProps> = ({type='submit', title}) => {
    return (
        <button type={type} className={`${style.button} ${style.blue}`}>
            <p>{title}</p>
        </button>
    );
};

export default BtnAction;