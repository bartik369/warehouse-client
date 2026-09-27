import { Key, useState } from 'react';

import { IssueFilterState, IssueProcessListItem } from '@/features/issue-device/model/types';
import { useQueryParams } from '@/shared/hooks/useQueryParams';
import { useDebounce } from '@/shared/lib/debounce/useDebounce';
import { appToast } from '@/shared/lib/toast/toast';
import { useDeleteIssueProcessMutation, useGetIssueProcessesQuery } from '@/store/api/issueApi';
import { useGetWarehousesQuery } from '@/store/api/warehousesApi';

import { NOTIFICATIONS } from './constants';

export const useIssueList = () => {
  const initialFilters: IssueFilterState = {
    search: '',
    warehousesSlugs: null,
    fromId: '',
    toId: '',
    dateRange: null,
  };
  const [filters, setFIlters] = useState(initialFilters);
  const [selectedIssue, setSelectedIssue] = useState<IssueProcessListItem | null>(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const { updateSearchParam, resetSearchParams, updateSearchParams } = useQueryParams();

  const debouncedSearch = useDebounce(filters.search, 500);

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

  const warehousesOptions = warehouses.map((item) => ({
    value: item.slug,
    label: item.name,
  }));

  return {
    filters,
    queryFilters,
    selectedRowKeys,
    selectedIssue,
    warehousesOptions,
    onSelect: handleSelect,
    onDelete: handleDeleteIssue,
    onSearch: handleIssueSearch,
    onWarehouseChange: handleWarehouseChange,
  };
};
