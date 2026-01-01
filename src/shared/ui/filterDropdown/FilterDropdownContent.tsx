import React from 'react';
import { Button, Checkbox, CheckboxOptionType, Space } from 'antd';
import { DeviceFilters } from '@/types/devices';
import { FilterDropdownProps, ColumnFilterItem } from 'antd/es/table/interface';
import { BUTTON_LABELS } from '@/utils/constants/ui/buttons';
import styles from './styles.module.scss';

interface FilterDropdownContentProps extends FilterDropdownProps {
  options: ColumnFilterItem[];
  filterKey: keyof DeviceFilters;
  resetSingleFilter: (key: keyof DeviceFilters) => void;
  setFilters: React.Dispatch<React.SetStateAction<DeviceFilters>>;
}
export const FilterDropdownContent = ({
  options,
  selectedKeys,
  setSelectedKeys,
  setFilters,
  clearFilters,
  resetSingleFilter,
  confirm,
  filterKey,
}: FilterDropdownContentProps) => {
  const checkboxOptions: CheckboxOptionType[] = options.map((item) => ({
    // Используем 'text' из ColumnFilterItem как 'label' для CheckboxOptionType
    label: item.text,
    value: item.value as string, // Приводим value к string, как обычно требуется
  }));
  return (
    <div className={styles.wrapper}>
      <div className={styles.checkboxes}>
        <Checkbox.Group
          options={checkboxOptions}
          value={selectedKeys}
          onChange={(keys) => setSelectedKeys(keys)}
          style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
        />
      </div>
      <Space>
        <Button
          size="small"
          onClick={() => {
            setFilters((prev: DeviceFilters) => ({
              ...prev,
              type: [],
            }));
            clearFilters?.();
            resetSingleFilter(filterKey);
            confirm();
          }}
        >
          {BUTTON_LABELS.reset}
        </Button>
        <Button
          type="primary"
          size="small"
          onClick={() => {
            setFilters((prev) => ({
              ...prev,
              type: selectedKeys as string[],
            }));
            confirm();
          }}
        >
          {BUTTON_LABELS.ok}
        </Button>
      </Space>
    </div>
  );
};
