import { Flex, SelectProps } from 'antd';
import { LuBriefcaseBusiness, LuUserRound } from 'react-icons/lu';
import { MdOutlineWarehouse } from 'react-icons/md';

import { IssueFilterState } from '@/features/issue-device/model/types';
import { CheckboxList } from '@/shared/ui/checkbox-list/CheckboxList';
import Search from '@/shared/ui/search/Search';
import { UserAutocomplete } from '@/shared/ui/user-autocomplete/UserAutocomplete';

import { DateRange } from '../date-range/DateRange';
import styles from './MovementFilters.module.scss';

interface MovementFiltersProps {
  filters: IssueFilterState;
  warehouseOptions: SelectProps['options'];
  onSearch: (value: string) => void;
  onWarehouseChange: (value: string[]) => void;
}
export const MovementFilters = ({
  filters,
  warehouseOptions,
  onSearch,
  onWarehouseChange,
}: MovementFiltersProps) => {
  return (
    <div className={styles.filters}>
      <Search placeholder="Укажите номер документа" value={filters.search} onChange={onSearch} />
      <CheckboxList
        width={245}
        allowClear
        label="Склад"
        showSearch={false}
        mode="multiple"
        maxTagCount={1}
        value={filters.warehousesSlugs}
        options={warehouseOptions}
        prefix={<MdOutlineWarehouse size={16} className={styles.icon} />}
        onChange={onWarehouseChange}
      />
      <UserAutocomplete
        prefix={<LuBriefcaseBusiness size={15} />}
        placeholder="Представитель компании"
        // loading={userController.status.isUsersLoading}
        // onSearch={userController.actions.handleChange}
        // onOptionSelect={userController.actions.handleSelect}
        // searched={userController.data.wasSearched}
        // value={userController.data.query}
        // options={userController.data.options}
      />
      <UserAutocomplete
        placeholder="Сотрудник"
        prefix={<LuUserRound size={15} />}
        // loading={userController.status.isUsersLoading}
        // onSearch={userController.actions.handleChange}
        // onOptionSelect={userController.actions.handleSelect}
        // searched={userController.data.wasSearched}
        // value={userController.data.query}
        // options={userController.data.options}
      />
      <DateRange placeholder={['Начало периода', 'Конец периода']} />
    </div>
  );
};
