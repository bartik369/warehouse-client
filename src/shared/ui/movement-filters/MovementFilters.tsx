import { GrDocumentText } from 'react-icons/gr';
import { HiOutlineSelector } from 'react-icons/hi';
import { LuBriefcaseBusiness, LuUserRound } from 'react-icons/lu';
import { MdOutlineWarehouse } from 'react-icons/md';
import { RiResetLeftFill } from 'react-icons/ri';

import { statusOptions } from '@/features/issue-device/model/constants';
import {
  IssueListActions,
  IssueListData,
  IssueListStatus,
} from '@/features/issue-device/ui/issue-list/model/useIssueList';
import { activeFiltersCount } from '@/shared/lib/activeFiltersCount';
import { CheckboxList } from '@/shared/ui/checkbox-list/CheckboxList';
import Search from '@/shared/ui/search/Search';
import { UserAutocomplete } from '@/shared/ui/user-autocomplete/UserAutocomplete';

import { DateRange } from '../date-range/DateRange';
import { IconButton } from '../icon-button/IconButton';
import styles from './MovementFilters.module.scss';

interface MovementFiltersProps {
  data: IssueListData;
  status: IssueListStatus;
  actions: IssueListActions;
}
export const MovementFilters = ({ data, status, actions }: MovementFiltersProps) => {
  const filtersCount = activeFiltersCount(data.filters);
  const isDisabled = filtersCount === 0;
  return (
    <div className={styles.filters}>
      <Search
        className={styles.search}
        placeholder="Укажите номер документа"
        value={data.filters.search}
        onChange={actions.onSearch}
      />
      <CheckboxList
        className={styles.warehouse}
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
        className={styles.person}
        prefix={<LuBriefcaseBusiness size={15} />}
        placeholder="Кто выдал"
        searched={status.wasCompanyPersonSearched}
        loading={status.isCompanyPersonsLoading}
        value={data.searchPerson.company}
        options={data.companyPersonsOptions}
        onSearch={actions.onCompanyPersonSearch}
        onOptionSelect={actions.onCompanyPersonChange}
        onClear={actions.onResetCompanyPerson}
      />
      <UserAutocomplete
        className={styles.person}
        placeholder="Кому выдали"
        prefix={<LuUserRound size={15} />}
        searched={status.wasEmployeePersonSearched}
        loading={status.isEmployeePersonsLoading}
        value={data.searchPerson.employee}
        options={data.employeePersonsOptions}
        onSearch={actions.onCompanyEmployeeSearch}
        onOptionSelect={actions.onEmployeePersonChange}
        onClear={actions.onResetEmployeePerson}
      />
      <CheckboxList
        width={130}
        label="Состояние"
        allowClear
        value={data.filters.status}
        options={statusOptions}
        suffix={<HiOutlineSelector size={14} />}
        prefix={<GrDocumentText size={14} className={styles.icon} />}
        onChange={actions.onStatusChange}
      />
      <DateRange
        className={styles.dateRange}
        placeholder={['Начало периода', 'Конец периода']}
        onChange={actions.onDateRangeChange}
      />
      <IconButton
        icon={RiResetLeftFill}
        variant="danger"
        disabled={isDisabled}
        onClick={actions.onResetFilter}
      />
    </div>
  );
};
