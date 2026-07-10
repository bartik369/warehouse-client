import { QuestionCircleOutlined } from '@ant-design/icons';
import { Input, Tooltip } from 'antd';
import clsx from 'clsx';

import styles from './styles.module.scss';
import { TextFieldProps } from './types';

export const TextField = ({
  label,
  error,
  value,
  tooltip,
  className,
  prefix,
  ...props
}: TextFieldProps) => {
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
