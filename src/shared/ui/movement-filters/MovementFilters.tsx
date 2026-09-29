import { Flex } from 'antd';
import { GrDocumentText } from 'react-icons/gr';
import { HiOutlineSelector } from 'react-icons/hi';
import { LuBriefcaseBusiness, LuUserRound } from 'react-icons/lu';
import { MdOutlineWarehouse } from 'react-icons/md';

import { ExportFile } from '@/features/export-file/ui/ExportFile';
import { statusOptions } from '@/features/issue-device/model/constants';
import { IssueProcessListItem } from '@/features/issue-device/model/types';
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
import { ResetButton } from '../reset-button/ResetButton';
import styles from './MovementFilters.module.scss';

interface MovementFiltersProps {
  processes: IssueProcessListItem[];
  data: IssueListData;
  status: IssueListStatus;
  actions: IssueListActions;
}
export const MovementFilters = ({ processes, data, status, actions }: MovementFiltersProps) => {
  const filtersCount = activeFiltersCount(data.filters);
  const isDisabled = filtersCount === 0;
  return (
    <div className={styles.toolbar}>
      <div className={styles.filtersScroll}>
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
            label="Представитель компании"
            className={styles.person}
            prefix={<LuBriefcaseBusiness size={15} />}
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
            label="Сотрудник"
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
            className={styles.status}
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
          <Flex className={styles.actions}>
            <ResetButton disabled={isDisabled} onClick={actions.onResetFilter} />
            <ExportFile stack={processes} />
          </Flex>
        </div>
      </div>
    </div>
  );
};
