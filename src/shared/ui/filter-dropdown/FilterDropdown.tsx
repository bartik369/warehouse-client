import React from 'react';

import { Checkbox, CheckboxOptionType, Space } from 'antd';
import { ColumnFilterItem, FilterDropdownProps } from 'antd/es/table/interface';

import { DeviceFilters } from '@/types/devices';
import { BUTTON_LABELS } from '@/utils/constants/ui/buttons';

import { ActionsPanel } from '../action-panel/ActionsPanel';
import styles from './FilterDropdown.module.scss';

interface FilterDropdownContentProps extends FilterDropdownProps {
  options: ColumnFilterItem[];
  filterKey: keyof DeviceFilters;
  resetSingleFilter: (key: keyof DeviceFilters) => void;
  setFilters: React.Dispatch<React.SetStateAction<DeviceFilters>>;
}
export const FilterDropdown = ({
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
    label: item.text,
    value: item.value as string,
  }));

  const handleReset = () => {
    setFilters((prev: DeviceFilters) => ({
      ...prev,
      type: [],
    }));
    clearFilters?.();
    resetSingleFilter(filterKey);
    confirm();
  };
  const handleApply = () => {
    setFilters((prev) => ({
      ...prev,
      type: selectedKeys as string[],
    }));
    confirm();
  };
  return (
    <div className={styles.wrapper}>
      <ActionsPanel
        titleApply={BUTTON_LABELS.apply}
        onReset={handleReset}
        onApply={handleApply}
        size="small"
      >
        <div className={styles.checkboxes}>
          <Checkbox.Group
            options={checkboxOptions}
            value={selectedKeys}
            onChange={(keys) => setSelectedKeys(keys)}
            className={styles.filterCheckbox}
          />
        </div>
      </ActionsPanel>
    </div>
  );
};
