import { Key, useState } from 'react';

import { IssueProcessListItem } from '@/features/issue-device/model/types';
import { useTablePagination } from '@/shared/hooks/useTablePagination';
import { useGetIssueProcessesQuery } from '@/store/api/issueApi';

export const useIssueList = () => {
  const { page, limit, setPage, setLimit, resetPage } = useTablePagination();
  const [selectedIssue, setSelectedIssue] = useState<IssueProcessListItem | null>(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);

  const { data: issueProcesses = [], isLoading } = useGetIssueProcessesQuery();
  const handleSelect = (record: IssueProcessListItem, selected: boolean) => {
    if (selected) {
      setSelectedRowKeys([record.id]);
      setSelectedIssue(record);
    } else {
      setSelectedRowKeys([]);
      setSelectedIssue(null);
    }
  };

  return {
    page,
    limit,
    selectedRowKeys,
    issueProcesses,
    selectedIssue,
    isLoading,
    onSelect: handleSelect,
  };
};
