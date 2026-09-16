import { Flex, SelectProps } from 'antd';
import { HiOutlineSelector } from 'react-icons/hi';
import { LuBuilding2 } from 'react-icons/lu';
import { RiResetLeftLine } from 'react-icons/ri';
import { TbCategory } from 'react-icons/tb';

import { CheckboxList } from '@/shared/ui/checkbox-list/CheckboxList';
import { IconButton } from '@/shared/ui/icon-button/IconButton';
import Search from '@/shared/ui/search/Search';
import { SelectField } from '@/shared/ui/select-field/SelectField';

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
        {/* <SelectField
          value={filters.typeId}
          className={styles.select}
          popupClassName={styles.citySelectDropdown}
          label="Тип"
          options={typesOptions}
          suffixIcon={<HiOutlineSelector size={14} />}
          prefix={<TbCategory size={16} className={styles.icon} />}
        /> */}
        {/* <SelectField
          value={filters.manufacturerIds}
          className={styles.select}
          popupClassName={styles.citySelectDropdown}
          label="Производители"
          options={manufacturersOptions}
          suffixIcon={<HiOutlineSelector size={14} />}
          prefix={<LuBuilding2 size={15} className={styles.icon} />}
        /> */}
        <IconButton
          //   disabled={isDisabled}
          iconSize={18}
          icon={RiResetLeftLine}
          onClick={onResetFilter}
          size="lg"
          variant="danger"
          background="no"
        />
      </Flex>
    </Flex>
  );
};
