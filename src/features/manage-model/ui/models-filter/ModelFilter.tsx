import { Flex, SelectProps } from 'antd';
import { LuBuilding2 } from 'react-icons/lu';
import { RiResetLeftLine } from 'react-icons/ri';
import { TbCategory } from 'react-icons/tb';

import { activeFiltersCount } from '@/shared/lib/activeFiltersCount';
import { ActionButton } from '@/shared/ui/action-button/ActionButton';
import { CheckboxList } from '@/shared/ui/checkbox-list/CheckboxList';
import Search from '@/shared/ui/search/Search';

import { ModelFilterState } from '../../model/types';
import styles from './ModelFilter.module.scss';

interface ModelFilterProps {
  filters: ModelFilterState;
  manufacturersOptions: SelectProps['options'];
  typesOptions: SelectProps['options'];
  onResetFilter: () => void;
  onSearch: (value: string) => void;
  handleManufacturerChange: (value: string[]) => void;
  handleTypeChange: (value: string[]) => void;
}

export const ModelFilter = ({
  filters,
  manufacturersOptions,
  typesOptions,
  onResetFilter,
  onSearch,
  handleManufacturerChange,
  handleTypeChange,
}: ModelFilterProps) => {
  const filtersCount = activeFiltersCount(filters);
  const isDisabled = filtersCount === 0;
  return (
    <Flex justify="space-between" gap={40}>
      <Flex className={styles.search}>
        <Search
          placeholder="Поиск по типу или производителю"
          value={filters.search}
          name="search"
          onChange={onSearch}
        />
      </Flex>
      <Flex gap={20} flex={1}>
        <CheckboxList
          width={245}
          allowClear
          label="Тип"
          showSearch={false}
          mode="multiple"
          maxTagCount={1}
          value={filters.typeIds}
          options={typesOptions}
          prefix={<TbCategory size={16} className={styles.icon} />}
          onChange={handleTypeChange}
        />
        <CheckboxList
          width={245}
          allowClear
          label="Производители"
          showSearch={false}
          mode="multiple"
          maxTagCount={1}
          value={filters.manufacturerIds}
          options={manufacturersOptions}
          prefix={<LuBuilding2 size={16} className={styles.icon} />}
          onChange={handleManufacturerChange}
        />
        <ActionButton
          disabled={isDisabled}
          icon={RiResetLeftLine}
          variant="apply"
          title="Сбросить"
          onClick={onResetFilter}
        />
      </Flex>
    </Flex>
  );
};
