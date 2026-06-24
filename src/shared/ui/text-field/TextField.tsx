import { Input } from 'antd';
import clsx from 'clsx';

import styles from './styles.module.scss';
import { TextFieldProps } from './types';

export const TextField = ({ label, error, value, className, ...props }: TextFieldProps) => {
  const isFilled = Boolean(value);

  return (
    <div className={clsx(styles.root, className)}>
      <div className={styles.inputWrapper}>
        <Input
          {...props}
          className={styles.input}
          value={value}
          placeholder=""
          allowClear
          status={error ? 'error' : undefined}
        />
        <label className={clsx(styles.label, isFilled && styles.labelActive)}>{label}</label>
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};
