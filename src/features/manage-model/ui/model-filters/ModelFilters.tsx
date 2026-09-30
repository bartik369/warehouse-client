import { Flex, SelectProps } from 'antd';
import { LuBuilding2 } from 'react-icons/lu';
import { TbCategory } from 'react-icons/tb';

import { activeFiltersCount } from '@/shared/lib/activeFiltersCount';
import { CheckboxList } from '@/shared/ui/checkbox-list/CheckboxList';
import { ResetButton } from '@/shared/ui/reset-button/ResetButton';
import Search from '@/shared/ui/search/Search';

import { ModelFilterState } from '../../model/types';
import styles from './ModelFilter.module.scss';

interface ModelFiltersProps {
  filters: ModelFilterState;
  manufacturersOptions: SelectProps['options'];
  typesOptions: SelectProps['options'];
  onResetFilter: () => void;
  onSearch: (value: string) => void;
  onManufacturerChange: (value: string[]) => void;
  onTypeChange: (value: string[]) => void;
}

export const ModelFilters = ({
  filters,
  manufacturersOptions,
  typesOptions,
  onResetFilter,
  onSearch,
  onManufacturerChange,
  onTypeChange,
}: ModelFiltersProps) => {
  const filtersCount = activeFiltersCount(filters);
  const isDisabled = filtersCount === 0;
  return (
    <Flex className={styles.container}>
      <Search
        placeholder="Поиск по типу или производителю"
        value={filters.search}
        name="search"
        onChange={onSearch}
      />
      <CheckboxList
        allowClear
        label="Тип"
        showSearch={false}
        mode="multiple"
        maxTagCount={1}
        value={filters.typeIds}
        options={typesOptions}
        prefix={<TbCategory size={16} className={styles.icon} />}
        onChange={onTypeChange}
      />
      <CheckboxList
        allowClear
        label="Производители"
        showSearch={false}
        mode="multiple"
        maxTagCount={1}
        value={filters.manufacturerIds}
        options={manufacturersOptions}
        prefix={<LuBuilding2 size={16} className={styles.icon} />}
        onChange={onManufacturerChange}
      />
      <ResetButton disabled={isDisabled} onClick={onResetFilter} />
    </Flex>
  );
};
