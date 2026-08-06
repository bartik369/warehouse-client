import { AutoComplete, Input } from 'antd';
import clsx from 'clsx';
import { PiDevicesDuotone } from 'react-icons/pi';

import { LABELS } from '@/utils/constants/ui/labels';

import { Spinner } from '../spinner/Spinner';
import styles from './DeviceAutocomplete.module.scss';
import { DEVICE_NOT_FOUND, DEVICE_PLACEHOLDER, SEARCH_PROCESS } from './constants';
import { AutocompleteFieldProps } from './types';

export const DeviceAutocomplete = ({
  value,
  onChange,
  onOptionSelect,
  onBlur,
  onSearch,
  onClear,
  options,
  loading,
  searched,
  className,
  placeholder = DEVICE_PLACEHOLDER,
  disabled,
}: AutocompleteFieldProps) => {
  const notFoundContent = loading ? (
    <div className={styles.loading}>
      <Spinner color="var(--blue-600)" fontSize={14} />
      <span>{SEARCH_PROCESS}</span>
    </div>
  ) : searched && options?.length === 0 ? (
    DEVICE_NOT_FOUND
  ) : null;

  return (
    <div className={clsx(styles.root, className)}>
      <div className={styles.inputWrapper}>
        <AutoComplete
          popupRender={(menu) => (
            <>
              <div className={styles.header}>
                <span></span>
                <span>{LABELS.name}</span>
                <span>{LABELS.manufacturer}</span>
                <span>{LABELS.serialNumber}</span>
                <span>{LABELS.inventoryNumber}</span>
              </div>
              {menu}
            </>
          )}
          style={{ width: '100%' }}
          value={value}
          options={options}
          disabled={disabled}
          notFoundContent={notFoundContent}
          onSelect={onOptionSelect}
          onChange={onChange}
          onBlur={onBlur}
          onSearch={onSearch}
        >
          <Input
            allowClear
            prefix={<PiDevicesDuotone size={24} />}
            className={styles.input}
            placeholder={placeholder}
            onClear={onClear}
          />
        </AutoComplete>
      </div>
    </div>
  );
};
