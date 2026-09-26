import { useTablePagination } from '@/shared/hooks/useTablePagination';
import { useGetUsersQuery } from '@/store/api/userApi';

import { UserFilterState } from './types';

export const useUserTableController = (filters: UserFilterState) => {
  const { page, limit, setPage, setLimit } = useTablePagination({
    itemLimit: 10,
  });

  const userArgs = { ...filters };
  const { data: users, isLoading, isFetching } = useGetUsersQuery({ page, limit, ...userArgs });
  return {
    page,
    limit,
    users: users?.items ?? [],
    isLoading,
    isFetching,
    totalCount: users?.total ?? 0,
    setPage,
    setLimit,
  };
};
