import styles from './Loader.module.scss';

interface LoaderProps {
  size: 'sm' | 'md' | 'lg';
  color: 'orange' | 'grey';
}

const Loader = ({ size, color }: LoaderProps) => {
  // todo  удалить компонет после добавления спинера от ant
  return (
    <div className={styles.wrapper}>
      <span className={`${styles[size]} ${styles[color]}`}></span>
    </div>
  );
};

export default Loader;
