import { useCallback, useEffect, useMemo, useReducer, useState } from 'react';

import { skipToken } from '@reduxjs/toolkit/query';
import { FilterValue, SorterResult, TablePaginationConfig } from 'antd/es/table/interface';
import { useParams, useSearchParams } from 'react-router-dom';

import { useGetDeviceOptionsQuery, useGetDevicesQuery } from '@/store/api/devicesApi';
import { DeviceFilters, FilterDeviceOptions, FilteredDevicesFromBack } from '@/types/devices';
import { formatFiltersToSearchParams } from '@/utils/data/filterUtils';

import { useDeviceFilters } from './useDeviceFilters';
import { useTablePagination } from './useTablePagination';

const emptyOptions: FilterDeviceOptions = {
  manufacturer: [],
  isFunctional: [],
  isAssigned: [],
  type: [],
  memorySize: [],
  screenSize: [],
  model: [],
  warehouse: [],
};

export const useDeviceTableController = () => {
  const [_, setSearchParams] = useSearchParams();
  const { city } = useParams();

  const { page, limit, setPage, setLimit, resetPage } = useTablePagination();
  const { filters, setFilters, resetFilters } = useDeviceFilters();

  const queryParams = useMemo(() => {
    const params = formatFiltersToSearchParams(filters);
    params.page = String(page);
    params.limit = String(limit);
    return params;
  }, [filters, page, limit]);

  const deviceOptionsArgs = city ?? skipToken;
  const deviceQueryArgs = city ? { ...queryParams, city } : skipToken;

  const { data: optionsData } = useGetDeviceOptionsQuery(deviceOptionsArgs);
  const { data: devicesData } = useGetDevicesQuery(deviceQueryArgs);

  const options = optionsData || emptyOptions;
  const devices = devicesData;
  const totalCount = devicesData?.totalCount ?? 0;

  const handleTableChange = useCallback(
    (
      pagination: TablePaginationConfig,
      antFilters: Record<string, FilterValue | null>,
      _sorter: SorterResult<FilteredDevicesFromBack>[] | SorterResult<FilteredDevicesFromBack>
    ) => {
      if (pagination.pageSize && pagination.pageSize !== limit) {
        setLimit(pagination.pageSize);
        setPage(1);

        setSearchParams((prev) => {
          prev.set('limit', pagination.pageSize!.toString());
          prev.set('page', '1');
          return prev;
        });
      } else {
        setPage(pagination.current!);
        setSearchParams((prev) => {
          prev.set('page', pagination.current!.toString());
          return prev;
        });
      }
      const updatedFilters: Partial<DeviceFilters> = {};

      Object.entries(antFilters).forEach(([key, value]) => {
        const filterKey = key as keyof DeviceFilters;

        if (filterKey in filters) {
          const newValues = Array.isArray(value) ? (value as string[]) : [];
          updatedFilters[filterKey] = newValues;
        }
      });

      const mergedFilters = {
        ...filters,
        ...updatedFilters,
      };

      setFilters(mergedFilters as DeviceFilters);
    },
    [filters, setFilters]
  );
  const resetSingleFilter = useCallback(
    (key: keyof DeviceFilters) => {
      setFilters((prev) => ({
        ...prev,
        [key]: [],
      }));
      resetPage();
    },
    [setFilters]
  );

  useEffect(() => {
    setSearchParams(queryParams);
  }, [queryParams, setSearchParams]);

  return {
    devices,
    options,
    filters,
    page,
    limit,
    totalCount,
    setPage,
    handleTableChange,
    resetFilters,
    resetSingleFilter,
  };
};
