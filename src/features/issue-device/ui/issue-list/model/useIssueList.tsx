import { Key, useMemo, useState } from 'react';

import {
  IssueFilterState,
  IssueProcessListItem,
  PersonState,
} from '@/features/issue-device/model/types';
import { useQueryParams } from '@/shared/hooks/useQueryParams';
import { useDebounce } from '@/shared/lib/debounce/useDebounce';
import { appToast } from '@/shared/lib/toast/toast';
import { UserAutocompleteItem } from '@/shared/ui/user-autocomplete/UserAutocompleteItem';
import { UserAutocompleteOption } from '@/shared/ui/user-autocomplete/types';
import { useDeleteIssueProcessMutation, useGetIssueProcessesQuery } from '@/store/api/issueApi';
import { useGetFilteredUsersQuery } from '@/store/api/userApi';
import { useGetWarehousesQuery } from '@/store/api/warehousesApi';

import { NOTIFICATIONS } from './constants';

export const useIssueList = () => {
  const initialFilters: IssueFilterState = {
    search: '',
    warehousesSlugs: null,
    companyPersonQuery: '',
    employeePersonQuery: '',
    dateRange: null,
  };
  const initialPersons: PersonState = {
    company: '',
    employee: '',
  };
  const [filters, setFIlters] = useState(initialFilters);
  const [selectedIssue, setSelectedIssue] = useState<IssueProcessListItem | null>(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const { updateSearchParam, resetSearchParams, updateSearchParams } = useQueryParams();

  const debouncedSearch = useDebounce(filters.search, 500);

  const [searchPerson, setSearchPerson] = useState(initialPersons);
  const debouncedCompanyPersonSearch = useDebounce(searchPerson.company, 500);
  const debouncedEmployeePersonSearch = useDebounce(searchPerson.employee, 500);
  const wasCompanyPersonSearched = debouncedCompanyPersonSearch.length >= 2;
  const wasEmployeePersonSearched = debouncedEmployeePersonSearch.length >= 2;

  const { data: companyPersons = [], isLoading: isCompanyPersonsLoading } =
    useGetFilteredUsersQuery(debouncedCompanyPersonSearch, {
      skip: !debouncedCompanyPersonSearch,
    });
  const { data: employeePersons = [], isLoading: isEmployeePersonsLoading } =
    useGetFilteredUsersQuery(debouncedEmployeePersonSearch, {
      skip: !debouncedEmployeePersonSearch,
    });
  const companyPersonsOptions = useMemo<UserAutocompleteOption[]>(
    () =>
      wasCompanyPersonSearched
        ? companyPersons.map((user) => ({
            value: user.email,
            label: <UserAutocompleteItem key={user.id} user={user} />,
            user,
          }))
        : [],
    [wasCompanyPersonSearched, companyPersons]
  );

  const employeePersonsOptions = useMemo<UserAutocompleteOption[]>(
    () =>
      wasEmployeePersonSearched
        ? employeePersons.map((user) => ({
            value: user.email,
            label: <UserAutocompleteItem key={user.id} user={user} />,
            user,
          }))
        : [],
    [wasEmployeePersonSearched, employeePersons]
  );

  const queryFilters = {
    ...filters,
    search: debouncedSearch,
  };

  const [deleteIssueProcess, { isLoading: deleteLoading }] = useDeleteIssueProcessMutation();
  const { data: warehouses = [], isLoading: isLoadingWarehouses } = useGetWarehousesQuery();

  const handleSelect = (record: IssueProcessListItem, selected: boolean) => {
    if (selected) {
      setSelectedRowKeys([record.id]);
      setSelectedIssue(record);
    } else {
      setSelectedRowKeys([]);
      setSelectedIssue(null);
    }
  };

  const handleDeleteIssue = async (processId: string) => {
    try {
      if (!processId) return;
      await deleteIssueProcess(processId).unwrap();
      appToast.success(NOTIFICATIONS.deleted);
    } catch (error) {
      console.log(error);
    }
  };
  const handleIssueSearch = (value: string) => {
    setFIlters((prev) => ({
      ...prev,
      search: value,
    }));
    updateSearchParam('search', value);
  };

  const handleWarehouseChange = (value: string[]) => {
    setFIlters((prev) => ({
      ...prev,
      warehousesSlugs: value,
    }));
    updateSearchParam('warehousesSlugs', value);
  };

  const handleCompanyPersonSearch = (value: string) => {
    setSearchPerson((prev) => ({
      ...prev,
      company: value,
    }));
  };
  const handleCompanyEmployeeSearch = (value: string) => {
    setSearchPerson((prev) => ({
      ...prev,
      employee: value,
    }));
  };

  const handleDateRangeChange = (value: [string, string]) => {
    setFIlters((prev) => ({
      ...prev,
      dateRange: value,
    }));
    updateSearchParam('dateRange', value);
  };

  const warehousesOptions = warehouses.map((item) => ({
    value: item.slug,
    label: item.name,
  }));

  const data = {
    filters,
    queryFilters,
    selectedRowKeys,
    selectedIssue,
    warehousesOptions,
    companyPersonsOptions,
    employeePersonsOptions,
  };

  const status = {
    wasCompanyPersonSearched,
    wasEmployeePersonSearched,
    isCompanyPersonsLoading,
    isEmployeePersonsLoading,
  };

  const issueListActions = {
    onSelect: handleSelect,
    onDelete: handleDeleteIssue,
    onSearch: handleIssueSearch,
    onWarehouseChange: handleWarehouseChange,
    onDateRangeChange: handleDateRangeChange,
    onCompanyPersonSearch: handleCompanyPersonSearch,
    onCompanyEmployeeSearch: handleCompanyEmployeeSearch,
  };

  return {
    issueListActions,
    status,
    data,
  };
};

export type UseIssueListResult = ReturnType<typeof useIssueList>;
export type IssueListActions = UseIssueListResult['issueListActions'];
export type IssueListStatus = UseIssueListResult['status'];
export type IssueListData = UseIssueListResult['data'];
