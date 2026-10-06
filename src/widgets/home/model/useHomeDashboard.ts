import { useGetDevicesStatisticsQuery } from '@/store/api/devicesApi';

export const useHomeDashboard = () => {
  const { data: statistics, isLoading: isStatsLoading } = useGetDevicesStatisticsQuery();

  return {
    loading: isStatsLoading,
    categories: statistics?.byCategory ?? [],
    totalCount: statistics?.total ?? 0,
    assignedCount: statistics?.assigned ?? 0,
    availableCount: statistics?.inStock ?? 0,
    underRepairCount: statistics?.nonFunctional ?? 0,
  };
};
