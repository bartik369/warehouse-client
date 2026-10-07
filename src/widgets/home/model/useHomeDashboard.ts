import { useState } from 'react';

import {
  useGetDevicesStatisticsAdditionsQuery,
  useGetDevicesStatisticsQuery,
} from '@/store/api/devicesApi';

import { DeviceAdditionsPeriod } from './types';

export const useHomeDashboard = () => {
  const [period, setPeriod] = useState<DeviceAdditionsPeriod>('24m');
  const { data: statistics, isLoading: isStatsLoading } = useGetDevicesStatisticsQuery();
  // todo  период уходит на бэк и осталось доделать сервис, после чего удалить моковские данные
  const { data: additions, isLoading: isAdditionsLoading } =
    useGetDevicesStatisticsAdditionsQuery(period);
  const handlePeriodChange = (value: DeviceAdditionsPeriod) => {
    setPeriod(value);
  };

  return {
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
