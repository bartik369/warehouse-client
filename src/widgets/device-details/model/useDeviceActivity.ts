import { useTablePagination } from '@/shared/hooks/useTablePagination';
import { useGetDeviceHistoryQuery, useGetDeviceQuery } from '@/store/api/devicesApi';

export const useDeviceActivity = (id: string) => {
  const { page, limit, setPage, setLimit } = useTablePagination({
    itemLimit: 20,
  });
  const { data: device, isLoading, isError } = useGetDeviceQuery(id);
  const { data: deviceHistory = [], isLoading: isHistoryLoading } = useGetDeviceHistoryQuery(id);
  return {
    page,
    limit,
    device,
    isError,
    deviceHistory,
    isLoading,
    isHistoryLoading,
  };
};
