import styles from "./TechnicalOptions.module.scss";

interface TechnicalOptionsProps {
  name: string;
  value: string | number;
}

const TechnicalOptions = ({ name, value }: TechnicalOptionsProps) => {
  return (
    <div className={styles.property}>
      <div className={styles.name}>{name}</div>
      <div className={styles.dots}></div>
      <div className={styles.value}>{value}</div>
    </div>
  );
};

export default TechnicalOptions;
