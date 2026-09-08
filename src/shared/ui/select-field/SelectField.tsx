import { Select } from 'antd';
import clsx from 'clsx';

import styles from './SelectField.module.scss';
import { SelectFieldProps } from './types';

export const SelectField = ({
  label,
  error,
  value,
  className,
  prefix,
  ...props
}: SelectFieldProps) => {
  const isFiled = value != null && value !== '';
  const hasPrefix = Boolean(prefix);
  return (
    <div className={clsx(styles.root, className)}>
      <div className={styles.selectWrapper}>
        <Select
          {...props}
          prefix={prefix}
          className={styles.select}
          value={value ?? undefined}
          placeholder=""
          status={error ? 'error' : undefined}
        />
        <label
          className={clsx(
            styles.label,
            isFiled && styles.labelActive,
            hasPrefix && styles.labelWithPrefix
          )}
        >
          {label}
        </label>
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};
