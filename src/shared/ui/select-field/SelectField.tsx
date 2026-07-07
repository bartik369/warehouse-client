import { Select } from 'antd';
import clsx from 'clsx';

import styles from './SelectField.module.scss';
import { SelectFieldProps } from './types';

export const SelectField = ({ label, error, value, className, ...props }: SelectFieldProps) => {
  const isFiled = value != null && value !== '';
  return (
    <div className={clsx(styles.root, className)}>
      <div className={styles.selectWrapper}>
        <Select
          {...props}
          className={styles.select}
          value={value || undefined}
          placeholder=""
          allowClear
          status={error ? 'error' : undefined}
        />
        <label className={clsx(styles.label, isFiled && styles.labelActive)}>{label}</label>
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};
