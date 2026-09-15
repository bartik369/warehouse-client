import { Flex, SelectProps } from 'antd';
import { HiOutlineSelector } from 'react-icons/hi';
import { LuBuilding2 } from 'react-icons/lu';
import { RiResetLeftLine } from 'react-icons/ri';
import { TbCategory } from 'react-icons/tb';

import { IconButton } from '@/shared/ui/icon-button/IconButton';
import Search from '@/shared/ui/search/Search';
import { SelectField } from '@/shared/ui/select-field/SelectField';

import styles from './ModelFilter.module.scss';

interface ModelFilterProps {
  manufacturersOptions: SelectProps['options'];
  typesOptions: SelectProps['options'];
  onResetFilter: () => void;
}

export const ModelFilter = ({
  manufacturersOptions,
  typesOptions,
  onResetFilter,
}: ModelFilterProps) => {
  const handleSearch = () => {};
  return (
    <Flex justify="space-between" gap={40}>
      <Flex className={styles.search}>
        <Search
          placeholder="Поиск по типу или производителю"
          value=""
          name="search"
          onChange={handleSearch}
        />
      </Flex>
      <Flex gap={20} flex={1}>
        <SelectField
          value={''}
          className={styles.select}
          popupClassName={styles.citySelectDropdown}
          label="Тип"
          options={typesOptions}
          suffixIcon={<HiOutlineSelector size={14} />}
          prefix={<TbCategory size={16} className={styles.icon} />}
        />
        <SelectField
          value={''}
          className={styles.select}
          popupClassName={styles.citySelectDropdown}
          label="Производители"
          options={manufacturersOptions}
          suffixIcon={<HiOutlineSelector size={14} />}
          prefix={<LuBuilding2 size={15} className={styles.icon} />}
        />
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
