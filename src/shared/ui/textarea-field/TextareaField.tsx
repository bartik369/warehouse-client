import { Input } from 'antd';
import clsx from 'clsx';

import styles from './TextareaField.module.scss';
import { TextareaFieldProps } from './types';

export const TextareaField = ({ label, error, value, className, ...props }: TextareaFieldProps) => {
  const isFilled = value != null || value !== '';
  return (
    <div className={clsx(styles.root, className)}>
      <div className={styles.textareaWrapper}>
        <Input.TextArea
          {...props}
          className={styles.textarea}
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
