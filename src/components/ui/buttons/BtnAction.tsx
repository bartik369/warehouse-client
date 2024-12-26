import {FC} from 'react';
import style from './Buttons.module.scss';

interface IButtonProps {
    type?: 'submit' | 'button' | 'reset';
    color: string;
    title: string;
    click?:() => void;
};

const BtnAction:FC<IButtonProps> = ({type, title, click, color}) => {
    return (
        <button onClick={click} type={type} className={`${style.button} ${style[color]}`}>
            <p>{title}</p>
        </button>
    );
};

export default BtnAction;