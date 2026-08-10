import { Key, useState } from 'react';

import { IssueProcessListItem } from '@/features/issue-device/model/types';
import { useTablePagination } from '@/shared/hooks/useTablePagination';
import { useGetIssueProcessesQuery } from '@/store/api/issueApi';

export const useIssueList = () => {
  const { page, limit, setPage, setLimit, resetPage } = useTablePagination();
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);

  const { data: issueProcesses = [], isLoading } = useGetIssueProcessesQuery();
  const handleSelect = (record: IssueProcessListItem, selected: boolean) => {
    if (selected) {
      setSelectedRowKeys([record.id]);
      console.log(record);
    } else {
      setSelectedRowKeys([]);
    }
  };

  return {
    page,
    limit,
    selectedRowKeys,
    issueProcesses,
    isLoading,
    onSelect: handleSelect,
  };
};
