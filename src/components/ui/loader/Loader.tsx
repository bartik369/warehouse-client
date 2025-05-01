import styles from './Loader.module.scss';

interface ILoaderProps {
    size: 'sm' | 'md' | 'lg';
    color: 'blue' | 'green' | 'grey';
}

const Loader = ({ size, color }:ILoaderProps) => {
    return (
        <div className={styles.wrapper}>
            <span className={`${styles[size]} ${styles[color]}`}></span>  
        </div>
    );
};

export default Loader;