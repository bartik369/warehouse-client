import { Checkbox, Flex, Select } from 'antd';
import { SelectProps } from 'antd';
import clsx from 'clsx';

import styles from './CheckboxList.module.scss';

export type CheckboxListProps = Omit<SelectProps, 'placeholder'> & {
  label?: string;
  error?: string;
  width?: number | string;
};

export const CheckboxList = ({
  label,
  error,
  value = [],
  className,
  options = [],
  allowClear = false,
  mode,
  prefix,
  width = 180,
  ...props
}: CheckboxListProps) => {
  const isFilled =
    mode === 'multiple' ? Array.isArray(value) && value.length > 0 : value != null && value !== '';

  return (
    <div className={clsx(styles.root, className)} style={{ width }}>
      <div className={styles.selectWrapper}>
        <Select
          {...props}
          allowClear={allowClear}
          mode={mode}
          prefix={prefix}
          className={styles.checkboxList}
          classNames={{
            popup: {
              root: styles.dropdown,
            },
          }}
          value={value}
          status={error ? 'error' : undefined}
          options={options}
          optionRender={(option) => {
            const checked =
              mode === 'multiple'
                ? Array.isArray(value) && value.includes(option.value)
                : value === option.value;

            return (
              <div className={styles.option}>
                <Checkbox checked={checked} />
                <span>{option.label}</span>
              </div>
            );
          }}
        />
        <label className={clsx(styles.label, isFilled && styles.labelActive)}>{label}</label>
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};
