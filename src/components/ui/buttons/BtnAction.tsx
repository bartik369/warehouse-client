import React, {FC, memo} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import styles from './Buttons.module.scss';

interface IButtonProps {
    icon?: IconProp;
    size: 'sm' | 'md' | 'lg';
    color: string;
    type?: 'submit' | 'button' | 'reset';
    title: string;
    click:(e: React.MouseEvent<HTMLButtonElement>) => void;
};

const BtnAction:FC<IButtonProps> = memo(({icon, size, type, title, color, click}) => {
    return (
        <>
            <button 
                onClick={click} 
                type={type} 
                className={`${styles[size]} ${styles[color]}`}
            >
                {icon && 
                    <FontAwesomeIcon className={styles.icon} icon={icon} />
                }
                <p>{title}</p>
            </button>
        </>
    );
});

export default BtnAction;