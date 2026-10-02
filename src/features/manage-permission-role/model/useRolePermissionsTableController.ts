import { useTablePagination } from '@/shared/hooks/useTablePagination';
import { useGetPermissionsRolesQuery } from '@/store/api/permissionApi';

export const useRolePermissionsTableController = () => {
  const { page, limit, setPage, setLimit } = useTablePagination({
    itemLimit: 10,
  });
  const {
    data: permissionRoles,
    isFetching: permissionRolesFetching,
    isLoading: permissionRolesLoading,
  } = useGetPermissionsRolesQuery({ page, limit });

  return {
    permissionRoles: permissionRoles?.items ?? [],
    totalCount: permissionRoles?.total ?? 0,
    page,
    limit,
    permissionRolesLoading,
    permissionRolesFetching,
    setPage,
    setLimit,
  };
};
