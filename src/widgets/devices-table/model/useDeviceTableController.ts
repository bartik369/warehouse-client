import { skipToken } from '@reduxjs/toolkit/query';
import { useParams } from 'react-router-dom';

import { DeviceFiltersType } from '@/features/filter-devices/model/types';
import { useGetDevicesQuery } from '@/store/api/devicesApi';

import { useTablePagination } from '../../../shared/hooks/useTablePagination';

export const useDeviceTableController = (filters: DeviceFiltersType) => {
  const { city } = useParams();

  const { page, limit, setPage, setLimit } = useTablePagination();
  const deviceQueryArgs = city
    ? {
        city,
        page,
        limit,
        ...filters,
      }
    : skipToken;
  const { data: devicesData, isLoading } = useGetDevicesQuery(deviceQueryArgs);

  const totalCount = devicesData?.totalCount ?? 0;
  const devices = devicesData?.devices ?? [];

  const handleTableChange = () => {};

  return {
    devices,
    page,
    limit,
    totalCount,
    isLoading,
    setPage,
    handleTableChange,
  };
};
