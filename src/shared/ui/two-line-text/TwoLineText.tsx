import styles from './TwoLineText.module.scss';

interface TwoLineTextProps {
  primary: string;
  secondary?: string;
}

export const TwoLineText = ({ primary, secondary }: TwoLineTextProps) => {
  return (
    <div>
      <div className={styles.primary}>{primary}</div>
      {secondary && <div className={styles.secondary}>{secondary}</div>}
    </div>
  );
};
