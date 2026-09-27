import { DatePicker } from 'antd';
import clsx from 'clsx';

import styles from './DateField.module.scss';
import { DateFieldProps } from './types';

export const DateField = ({
  label,
  error,
  value,
  className,
  placeholder,
  ...props
}: DateFieldProps) => {
  const isFilled = value != null;

  return (
    <div className={clsx(styles.root, className)}>
      <div className={styles.dateWrapper}>
        <DatePicker
          {...props}
          multiple={false}
          className={styles.date}
          value={value}
          placeholder={placeholder}
          allowClear
          status={error ? 'error' : undefined}
        />
        <label className={clsx(styles.label, isFilled && styles.labelActive)}>{label}</label>
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};
