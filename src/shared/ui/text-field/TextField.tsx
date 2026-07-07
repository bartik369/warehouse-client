import { Input } from 'antd';
import clsx from 'clsx';

import styles from './styles.module.scss';
import { TextFieldProps } from './types';

export const TextField = ({ label, error, value, className, prefix, ...props }: TextFieldProps) => {
  const isFilled = Boolean(value);
  const hasPrefix = Boolean(prefix);

  return (
    <div className={clsx(styles.root, className)}>
      <div className={styles.inputWrapper}>
        <Input
          {...props}
          prefix={prefix}
          className={styles.input}
          value={value}
          placeholder=""
          allowClear
          status={error ? 'error' : undefined}
        />

        <label
          className={clsx(
            styles.label,
            isFilled && styles.labelActive,
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
