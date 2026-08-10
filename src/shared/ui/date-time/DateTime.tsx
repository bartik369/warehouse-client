import styles from './DateTime.module.scss';

interface DateTimeProps {
  date: string;
}
export const DateTime = ({ date }: DateTimeProps) => {
  const value = new Date(date);
  const formattedDate = value.toLocaleDateString('ru-RU');
  const formattedTime = value.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  return (
    <>
      <div className={styles.date}>{formattedDate}</div>
      <div className={styles.time}>{formattedTime}</div>
    </>
  );
};
