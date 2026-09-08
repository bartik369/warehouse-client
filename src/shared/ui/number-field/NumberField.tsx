import { CloseCircleFilled, QuestionCircleOutlined } from '@ant-design/icons';
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
  onChange,
  ...props
}: NumberFieldProps) => {
  const hasPrefix = Boolean(prefix);
  const hasValue = value !== null && value !== undefined;

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
          onChange={onChange}
        />

        <label
          className={clsx(
            styles.label,
            hasValue && styles.labelActive,
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

        {hasValue && (
          <button
            type="button"
            className={styles.clearButton}
            onClick={() => onChange?.(null)}
            aria-label="Очистить поле"
          >
            <CloseCircleFilled size={8} className={styles.icon} />
          </button>
        )}
      </div>

      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};
