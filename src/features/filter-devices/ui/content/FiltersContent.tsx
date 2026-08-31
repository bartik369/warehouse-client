import { Flex, SelectProps, Typography } from 'antd';
import { GrDocumentText } from 'react-icons/gr';
import { HiOutlineSelector } from 'react-icons/hi';
import { LuBuilding2 } from 'react-icons/lu';
import { TbCategory } from 'react-icons/tb';

import { CheckboxList } from '@/shared/ui/checkbox-list/CheckboxList';
import { ActionButton } from '@/shared/ui/signature-canvas/ui/action-button/ActionButton';
import { ValueRange } from '@/shared/ui/value-range/ValueRange';

import { AdvancedDeviceFiltersType } from '../../model/types';
import styles from './FiltersContent.module.scss';

interface FiltersContentProps {
  advancedFilters: AdvancedDeviceFiltersType;
  manufacturersOptions: SelectProps['options'];
  typesOptions: SelectProps['options'];
  availableOptions: SelectProps['options'];
  handleManufacturerChange: (value: string[]) => void;
  handleTypeChange: (value: string[]) => void;
  handleAssignedChange: (value: string) => void;
  handleMemorySize: (value: [number, number]) => void;
  handleDisplaySize: (value: [number, number]) => void;
  onReset: () => void;
  handleApply: () => void;
}

export const FiltersContent = ({
  advancedFilters,
  manufacturersOptions,
  typesOptions,
  availableOptions,
  handleManufacturerChange,
  handleTypeChange,
  handleAssignedChange,
  handleMemorySize,
  handleDisplaySize,
  onReset,
  handleApply,
}: FiltersContentProps) => {
  return (
    <Flex vertical gap={20} className={styles.container}>
      <Typography.Title level={5}>Дополнительные фильтры</Typography.Title>
      <Flex gap={10} vertical>
        <CheckboxList
          width={260}
          allowClear
          label="Производитель"
          showSearch={false}
          mode="multiple"
          maxTagCount={1}
          value={advancedFilters.manufacturerIds}
          options={manufacturersOptions}
          prefix={<LuBuilding2 size={15} className={styles.icon} />}
          onChange={handleManufacturerChange}
        />
        <CheckboxList
          width={260}
          allowClear
          label="Тип"
          showSearch={false}
          mode="multiple"
          maxTagCount={1}
          value={advancedFilters.typeIds}
          options={typesOptions}
          prefix={<TbCategory size={16} className={styles.icon} />}
          onChange={handleTypeChange}
        />
        <CheckboxList
          width={260}
          label="Доступность"
          allowClear
          value={advancedFilters.isAvailable == null ? null : String(advancedFilters.isAvailable)}
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
            value={advancedFilters.memorySize ?? [2, 128]}
            onChange={handleMemorySize}
          />
          <ValueRange
            label="Размер экрана"
            unit="дюйм"
            min={4}
            max={50}
            value={advancedFilters.displaySize ?? [4, 150]}
            onChange={handleDisplaySize}
          />
        </Flex>
      </Flex>
      <Flex gap={10}>
        <ActionButton title="Сбросить" variant="reset" onClick={onReset} />
        <ActionButton title="Применить" variant="apply" onClick={handleApply} />
      </Flex>
    </Flex>
  );
};
