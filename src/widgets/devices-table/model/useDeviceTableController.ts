import { skipToken } from '@reduxjs/toolkit/query';
import type { TableProps } from 'antd';
import { useParams } from 'react-router-dom';

import { Device } from '@/entities/device/model/types';
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
  const { data: devicesData, isLoading, isFetching } = useGetDevicesQuery(deviceQueryArgs);
  const totalCount = devicesData?.totalCount ?? 0;
  const devices = devicesData?.devices ?? [];

  const handleTableChange: TableProps<Device>['onChange'] = (pagination) => {
    if (pagination.pageSize !== limit) {
      setLimit(pagination.pageSize ?? 20);
      return;
    }

    if (pagination.current) {
      setPage(pagination.current);
    }
  };

  return {
    devices,
    page,
    limit,
    totalCount,
    isLoading,
    isFetching,
    setPage,
    handleTableChange,
  };
};
