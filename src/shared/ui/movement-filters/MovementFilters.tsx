import { Flex, SelectProps } from 'antd';
import { LuBriefcaseBusiness, LuUserRound } from 'react-icons/lu';
import { MdOutlineWarehouse } from 'react-icons/md';

import { IssueFilterState } from '@/features/issue-device/model/types';
import {
  IssueListActions,
  IssueListData,
  IssueListStatus,
} from '@/features/issue-device/ui/issue-list/model/useIssueList';
import { CheckboxList } from '@/shared/ui/checkbox-list/CheckboxList';
import Search from '@/shared/ui/search/Search';
import { UserAutocomplete } from '@/shared/ui/user-autocomplete/UserAutocomplete';

import { DateRange } from '../date-range/DateRange';
import { UserAutocompleteOption } from '../user-autocomplete/types';
import styles from './MovementFilters.module.scss';

interface MovementFiltersProps {
  data: IssueListData;
  status: IssueListStatus;
  actions: IssueListActions;
}
export const MovementFilters = ({ data, status, actions }: MovementFiltersProps) => {
  return (
    <div className={styles.filters}>
      <Search
        placeholder="Укажите номер документа"
        value={data.filters.search}
        onChange={actions.onSearch}
      />
      <CheckboxList
        width={245}
        allowClear
        label="Склад"
        showSearch={false}
        mode="multiple"
        maxTagCount={1}
        value={data.filters.warehousesSlugs}
        options={data.warehousesOptions}
        prefix={<MdOutlineWarehouse size={16} className={styles.icon} />}
        onChange={actions.onWarehouseChange}
      />
      <UserAutocomplete
        prefix={<LuBriefcaseBusiness size={15} />}
        placeholder="Представитель компании"
        searched={status.wasCompanyPersonSearched}
        onSearch={actions.onCompanyPersonSearch}
        loading={status.isCompanyPersonsLoading}
        // onOptionSelect={userController.actions.handleSelect}
        // value={userController.data.query}
        options={data.companyPersonsOptions}
      />
      <UserAutocomplete
        placeholder="Сотрудник"
        prefix={<LuUserRound size={15} />}
        searched={status.wasEmployeePersonSearched}
        loading={status.isEmployeePersonsLoading}
        onSearch={actions.onCompanyEmployeeSearch}
        // onOptionSelect={userController.actions.handleSelect}
        // value={userController.data.query}
        options={data.employeePersonsOptions}
      />
      <DateRange
        placeholder={['Начало периода', 'Конец периода']}
        onChange={actions.onDateRangeChange}
      />
    </div>
  );
};
