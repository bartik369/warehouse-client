import type { ReactNode } from 'react';

import { Checkbox, ConfigProvider, Select } from 'antd';
import clsx from 'clsx';

import type { Permission } from '@/entities/permission/model/types';

import styles from './PermissionsSelect.module.scss';

export interface PermissionsSelectProps {
  permissions: Permission[];
  value?: string[];
  label: string;
  error?: string;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  prefix?: ReactNode;
  onChange?: (value: string[]) => void;
  onBlur?: () => void;
}

export const PermissionsSelect = ({
  permissions,
  value = [],
  label,
  error,
  className,
  placeholder,
  disabled,
  onChange,
  onBlur,
}: PermissionsSelectProps) => {
  const options = permissions.map((permission) => ({
    value: permission.id,
    label: permission.comment,
    disabled: permission.disabled,
    permission,
  }));

  const isFilled = value.length > 0;

  return (
    <div className={clsx(styles.root, className)}>
      <div className={styles.selectWrapper}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#fe7126',
              colorPrimaryHover: '#fe7126',
              colorPrimaryActive: '#fe7126',
            },
            components: {
              Select: {
                optionSelectedBg: 'var(--gray-100)',
                optionActiveBg: 'var(--gray-100)',
                hoverBorderColor: 'var(--orange-200)',
                activeBorderColor: 'var(--orange-200)',
                multipleItemHeight: 34,
                borderRadius: 8,
              },
            },
          }}
        >
          <Select
            className={styles.select}
            mode="multiple"
            value={value}
            options={options}
            disabled={disabled}
            placeholder={placeholder}
            status={error ? 'error' : undefined}
            maxTagCount={0}
            maxTagPlaceholder={() => `Выбрано: ${value.length} из ${permissions.length}`}
            allowClear
            showSearch={false}
            popupMatchSelectWidth
            onChange={onChange}
            onBlur={onBlur}
            optionRender={(option) => {
              const permission = option.data.permission as Permission;
              return (
                <div className={styles.option}>
                  <Checkbox
                    checked={value.includes(permission.id)}
                    disabled={permission.disabled}
                    style={{ pointerEvents: 'none' }}
                  />
                  <div className={styles.content}>
                    <div className={styles.title}>{permission.comment}</div>
                    <div className={styles.code}>{permission.name}</div>
                  </div>
                </div>
              );
            }}
          />
        </ConfigProvider>
        <label className={clsx(styles.label, isFilled && styles.labelActive)}>{label}</label>
      </div>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};
