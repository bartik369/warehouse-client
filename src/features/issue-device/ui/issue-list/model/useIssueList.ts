import { Key, useState } from 'react';

import { IssueProcessListItem } from '@/features/issue-device/model/types';
import { useTablePagination } from '@/shared/hooks/useTablePagination';
import { appToast } from '@/shared/lib/toast/toast';
import { useDeleteIssueProcessMutation, useGetIssueProcessesQuery } from '@/store/api/issueApi';

import { NOTIFICATIONS } from './constants';

export const useIssueList = () => {
  const { page, limit, setPage, setLimit, resetPage } = useTablePagination();
  const [selectedIssue, setSelectedIssue] = useState<IssueProcessListItem | null>(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);

  const { data: issueProcesses = [], isLoading } = useGetIssueProcessesQuery();
  const [deleteIssueProcess, { isLoading: deleteLoading }] = useDeleteIssueProcessMutation();
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

  return {
    page,
    limit,
    selectedRowKeys,
    issueProcesses,
    selectedIssue,
    isLoading,
    onSelect: handleSelect,
    onDelete: handleDeleteIssue,
  };
};
