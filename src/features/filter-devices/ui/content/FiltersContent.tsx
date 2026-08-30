import { useMemo, useState } from 'react';

import { Flex, SelectProps, Typography } from 'antd';
import { GrDocumentText } from 'react-icons/gr';
import { HiOutlineSelector } from 'react-icons/hi';
import { PiCodesandboxLogoLight } from 'react-icons/pi';

import { CheckboxList } from '@/shared/ui/checkbox-list/CheckboxList';
import { ActionButton } from '@/shared/ui/signature-canvas/ui/action-button/ActionButton';
import { ValueRange } from '@/shared/ui/value-range/ValueRange';

import { DeviceFiltersType } from '../../model/types';
import styles from './FiltersContent.module.scss';

interface FiltersContentProps {
  filters: DeviceFiltersType;
  manufacturersOptions: SelectProps['options'];
  typesOptions: SelectProps['options'];
  availableOptions: SelectProps['options'];
  handleManufacturerChange: (value: string[]) => void;
  handleTypeChange: (value: string[]) => void;
  handleAssignedChange: (value: string) => void;
  handleMemorySize: (value: [number, number]) => void;
  handleDisplaySize: (value: [number, number]) => void;
}

export const FiltersContent = ({
  filters,
  manufacturersOptions,
  typesOptions,
  availableOptions,
  handleManufacturerChange,
  handleTypeChange,
  handleAssignedChange,
  handleMemorySize,
  handleDisplaySize,
}: FiltersContentProps) => {
  return (
    <Flex vertical gap={20} className={styles.container}>
      <Typography.Title level={5}>Активные фильтры</Typography.Title>
      <Flex gap={10} vertical>
        <CheckboxList
          width={260}
          allowClear
          label="Производитель"
          showSearch={false}
          mode="multiple"
          maxTagCount={1}
          value={filters.manufacturerIds}
          options={manufacturersOptions}
          prefix={<PiCodesandboxLogoLight size={16} className={styles.icon} />}
          onChange={handleManufacturerChange}
        />
        <CheckboxList
          width={260}
          allowClear
          label="Тип"
          showSearch={false}
          mode="multiple"
          maxTagCount={1}
          value={filters.typeIds}
          options={typesOptions}
          prefix={<PiCodesandboxLogoLight size={16} className={styles.icon} />}
          onChange={handleTypeChange}
        />
        <CheckboxList
          width={260}
          label="Доступность"
          allowClear
          value={filters.isAvailable == null ? null : String(filters.isAvailable)}
          options={availableOptions}
          suffix={<HiOutlineSelector size={14} />}
          prefix={<GrDocumentText size={14} className={styles.icon} />}
          onChange={handleAssignedChange}
        />
        <Flex vertical gap={10}>
          <ValueRange
            label="ОЗУ"
            unit="гб"
            min={2}
            max={128}
            value={filters.memorySize ?? [2, 128]}
            onChange={handleMemorySize}
          />
          <ValueRange
            label="Размер экрана"
            unit="дюйм"
            min={4}
            max={50}
            value={filters.displaySize ?? [4, 150]}
            onChange={handleDisplaySize}
          />
        </Flex>
      </Flex>
      <Flex gap={10}>
        <ActionButton title="Сбросить" variant="reset" />
        <ActionButton title="Применить" variant="apply" />
      </Flex>
    </Flex>
  );
};
