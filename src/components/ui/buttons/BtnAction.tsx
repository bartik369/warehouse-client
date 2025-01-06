import {FC} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import style from './Buttons.module.scss';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface IButtonProps {
    icon?: IconProp;
    size: 'sm' | 'md' | 'lg';
    color: string;
    type?: 'submit' | 'button' | 'reset';
    title: string;
    click?:() => void;
};

const BtnAction:FC<IButtonProps> = ({icon, size, type, title, color, click}) => {
    return (
        <>
            <button onClick={click} type={type} className={`${style[size]} ${style[color]}`}>
                <FontAwesomeIcon className={style.icon} icon={icon!} />
                <p>{title}</p>
            </button>
        </>
    );
};

export default BtnAction;