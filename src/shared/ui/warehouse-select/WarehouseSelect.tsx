import { useMemo } from 'react';

import { Flex, Radio, Select } from 'antd';
import clsx from 'clsx';
import { PiCityLight } from 'react-icons/pi';

import { Location } from '@/entities/location/model/types';
import { Warehouse } from '@/entities/warehouse/model/types';

import styles from './WarehouseSelect.module.scss';

interface WarehouseSelectProps {
  locations: Location[];
  warehouses: Warehouse[];
  value: Warehouse | null;
  prefix?: React.ReactNode;
  label: string;
  error?: string;
  placeholder?: string;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  status?: 'error' | 'warning';
  onChange?: (warehouse: Warehouse) => void;
  onBlur?: () => void;
  onReset: () => void;
}

export const WarehouseSelect = ({
  locations,
  warehouses,
  value,
  label,
  error,
  prefix,
  className,
  status,
  placeholder,
  loading = false,
  disabled,
  onChange,
  onBlur,
  onReset,
}: WarehouseSelectProps) => {
  const isFilled = Boolean(value?.name);

  const options = useMemo(
    () =>
      warehouses.map((warehouse) => ({
        value: warehouse.id,
        label: warehouse.name,
        city: locations.find((item) => item.id === warehouse.locationId)?.name,
      })),
    [warehouses, locations]
  );

  return (
    <div className={clsx(styles.root, className)}>
      <div className={styles.selectWrapper}>
        <Select
          className={styles.select}
          classNames={{
            popup: {
              root: styles.dropdown,
            },
          }}
          prefix={prefix}
          value={value?.id}
          options={options}
          placeholder={placeholder}
          disabled={disabled}
          loading={loading}
          allowClear
          onClear={onReset}
          status={status}
          showSearch={false}
          optionRender={(option) => {
            const checked = option.data.value === value?.id;
            return (
              <Flex align="center" gap={8}>
                <Radio
                  className={styles.radio}
                  checked={checked}
                  tabIndex={-1}
                  style={{ pointerEvents: 'none' }}
                />
                <Flex vertical className={styles.content}>
                  <div className={styles.name}>{option.data.label}</div>
                  <div className={styles.city}>
                    <PiCityLight className={styles.icon} />
                    {option.data.city}
                  </div>
                </Flex>
              </Flex>
            );
          }}
          onChange={(warehouseId: string) => {
            const selectedWarehouse = warehouses.find((warehouse) => warehouse.id === warehouseId);
            if (selectedWarehouse) {
              onChange?.(selectedWarehouse);
            }
          }}
          onBlur={onBlur}
        />
        <label className={clsx(styles.label, isFilled && styles.labelActive)}>{label}</label>
      </div>
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};
