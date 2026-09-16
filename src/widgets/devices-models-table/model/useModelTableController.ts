import { ModelFilterState } from '@/features/manage-model/model/types';
import { useTablePagination } from '@/shared/hooks/useTablePagination';
import { useGetModelsQuery } from '@/store/api/modelsApi';

export const useModelTableController = (filters: ModelFilterState) => {
  const { page, limit, setPage, setLimit } = useTablePagination();
  const modelArgs = { ...filters };
  const { data: models, isLoading, isFetching } = useGetModelsQuery({ page, limit, ...modelArgs });
  return {
    page,
    limit,
    models: models?.items,
    isLoading,
    isFetching,
    totalCount: models?.total,
  };
};
