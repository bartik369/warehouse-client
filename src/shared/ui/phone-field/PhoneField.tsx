import { CloseCircleFilled } from '@ant-design/icons';
import { Button, type InputProps } from 'antd';
import clsx from 'clsx';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

import styles from './PhoneField.module.scss';

export type PhoneFieldProps = Omit<
  InputProps,
  'value' | 'onChange' | 'placeholder' | 'prefix' | 'size' | 'type'
> & {
  value?: string;
  label?: string;
  error?: string;
  onChange?: (value: string) => void;
};

export const PhoneField = ({
  label,
  error,
  value = '',
  className,
  onChange,
  onBlur,
  disabled,
  name,
}: PhoneFieldProps) => {
  const isFilled = value.length > 0;

  return (
    <div className={clsx(styles.root, className)}>
      <div
        className={clsx(
          styles.inputWrapper,
          error && styles.inputWrapperError,
          disabled && styles.inputWrapperDisabled
        )}
      >
        <PhoneInput
          className={styles.input}
          defaultCountry="RU"
          countryCallingCodeEditable={false}
          disabled={disabled}
          international
          value={value || undefined}
          onChange={(phone) => {
            onChange?.(phone ?? '');
          }}
          onBlur={onBlur}
        />
        <label className={clsx(styles.label, isFilled && styles.labelActive)}>{label}</label>
        {value && !disabled && (
          <Button
            icon={<CloseCircleFilled />}
            className={styles.clearButton}
            onMouseDown={(event) => {
              event.preventDefault();
            }}
            onClick={() => {
              onChange?.('');
            }}
          />
        )}
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};
