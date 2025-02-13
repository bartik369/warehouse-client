import {FC} from 'react';
import styles from './Loader.module.scss';

interface ILoaderProps {
    size: 'sm' | 'md' | 'lg';
    color: 'blue' | 'green' | 'grey';
}

const Loader:FC<ILoaderProps> = ({size, color}) => {
    return (
        <div className={styles.wrapper}>
            <span className={`${styles[size]} ${styles[color]}`}></span>  
        </div>
    );
};

export default Loader;