import { useState } from 'react';

import {
  useGetDevicesStatisticsAdditionsQuery,
  useGetDevicesStatisticsQuery,
} from '@/store/api/devicesApi';
import { useGetRecentIssuesQuery } from '@/store/api/issueApi';

import { DeviceAdditionsPeriod } from './types';

export const useHomeDashboard = () => {
  const [period, setPeriod] = useState<DeviceAdditionsPeriod>('12m');
  const { data: statistics, isLoading: isStatsLoading } = useGetDevicesStatisticsQuery();
  // todo  период уходит на бэк и осталось доделать сервис, после чего удалить моковские данные
  const { data: additions, isLoading: isAdditionsLoading } =
    useGetDevicesStatisticsAdditionsQuery(period);
  const handlePeriodChange = (value: DeviceAdditionsPeriod) => {
    setPeriod(value);
  };
  const { data: recentIssues = [], isLoading: recentIssuesLoading } = useGetRecentIssuesQuery();
  console.log(recentIssues);

  return {
    recentIssues,
    recentIssuesLoading,
    period,
    loading: isStatsLoading,
    categories: statistics?.byCategory ?? [],
    totalCount: statistics?.total ?? 0,
    assignedCount: statistics?.assigned ?? 0,
    availableCount: statistics?.inStock ?? 0,
    underRepairCount: statistics?.nonFunctional ?? 0,
    onPeriodChange: handlePeriodChange,
  };
};
