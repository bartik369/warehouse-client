import { useState } from 'react';

import {
  useGetDevicesStatisticsAdditionsQuery,
  useGetDevicesStatisticsQuery,
} from '@/store/api/devicesApi';
import {
  useGetIssueUnfinishedProcessesCountQuery,
  useGetRecentIssuesQuery,
} from '@/store/api/issueApi';

import { ChartPeriods, Period } from './types';

export const useHomeDashboard = () => {
  const [period, setPeriod] = useState<ChartPeriods>({
    deviceAdditions: '12m',
    deviceMovements: '6m',
  });
  const { data: statistics, isLoading: isStatsLoading } = useGetDevicesStatisticsQuery();
  // todo  период уходит на бэк и осталось доделать сервис, после чего удалить моковские данные
  const { data: additions, isLoading: isAdditionsLoading } = useGetDevicesStatisticsAdditionsQuery(
    period.deviceAdditions
  );

  const handlePeriodChange = (chart: keyof ChartPeriods, value: Period) => {
    setPeriod((prev) => ({
      ...prev,
      [chart]: value,
    }));
  };
  const { data: recentIssues = [], isLoading: recentIssuesLoading } = useGetRecentIssuesQuery();
  const { data: unfinishedIssuesCount = 0, isLoading: isUnfinishedLoading } =
    useGetIssueUnfinishedProcessesCountQuery();

  return {
    recentIssues,
    recentIssuesLoading,
    period,
    loading: isStatsLoading,
    unfinishedIssuesCount,
    isUnfinishedLoading,
    categories: statistics?.byCategory ?? [],
    totalCount: statistics?.total ?? 0,
    assignedCount: statistics?.assigned ?? 0,
    availableCount: statistics?.inStock ?? 0,
    underRepairCount: statistics?.nonFunctional ?? 0,
    onPeriodChange: handlePeriodChange,
  };
};
