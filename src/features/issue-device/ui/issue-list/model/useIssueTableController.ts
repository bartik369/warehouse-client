import { IssueFilterState } from '@/features/issue-device/model/types';
import { useTablePagination } from '@/shared/hooks/useTablePagination';
import { useGetIssueProcessesQuery } from '@/store/api/issueApi';

export const useIssueTableController = (filters: IssueFilterState) => {
  const { page, limit, setPage, setLimit } = useTablePagination({
    itemLimit: 10,
  });
  const issueProcessesArgs = { ...filters };

  const { data, isLoading, isFetching } = useGetIssueProcessesQuery({
    page,
    limit,
    ...issueProcessesArgs,
  });

  return {
    page,
    limit,
    isLoading,
    isFetching,
    issueProcesses: data?.items ?? [],
    totalCount: data?.total ?? 0,
    setPage,
    setLimit,
  };
};
