import { QuestionCircleOutlined } from '@ant-design/icons';
import { InputNumber, Tooltip } from 'antd';
import clsx from 'clsx';

import styles from './NumberField.module.scss';
import { NumberFieldProps } from './types';

export const NumberField = ({
  label,
  error,
  value,
  tooltip,
  className,
  prefix,
  ...props
}: NumberFieldProps) => {
  const isFilled = Boolean(value);
  const hasPrefix = Boolean(prefix);

  return (
    <div className={clsx(styles.root, className)}>
      <div className={styles.inputWrapper}>
        <InputNumber
          {...props}
          prefix={prefix}
          min={0}
          className={styles.input}
          value={value}
          placeholder=""
          status={error ? 'error' : undefined}
        />
        <label
          className={clsx(
            styles.label,
            isFilled && styles.labelActive,
            hasPrefix && styles.labelWithPrefix
          )}
        >
          <span>{label}</span>
          {tooltip && (
            <Tooltip title={tooltip} trigger="hover" placement="top">
              <span className={styles.tooltipIcon}>
                <QuestionCircleOutlined />
              </span>
            </Tooltip>
          )}
        </label>
      </div>

      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};
