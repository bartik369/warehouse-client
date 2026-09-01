import { useState } from 'react';

import { useQueryParams } from '@/shared/hooks/useQueryParams';
import { useDebounce } from '@/shared/lib/debounce/useDebounce';
import { useGetManufacturersQuery } from '@/store/api/manufacturersApi';
import { useGetTypesQuery } from '@/store/api/typesApi';
import { useGetWarehousesQuery } from '@/store/api/warehousesApi';

import { availableStatus, cities, statuses } from './constants';
import { AdvancedDeviceFiltersType, DeviceFiltersType } from './types';

export const useDeviceFilters = () => {
  const initialFilters: DeviceFiltersType = {
    warehouseIds: [],
    isFunctional: null,
    search: '',
  };

  const initialAdvancedFilters: AdvancedDeviceFiltersType = {
    displaySize: null,
    memorySize: null,
    typeIds: [],
    manufacturerIds: [],
    isAvailable: null,
  };
  const { data: warehouses = [] } = useGetWarehousesQuery();
  const { data: manufacturers = [] } = useGetManufacturersQuery();
  const { data: types = [] } = useGetTypesQuery();
  const { updateSearchParam, updateSearchParams, resetSearchParams } = useQueryParams();

  const [filters, setFilters] = useState(initialFilters);
  const [advancedFilters, setAdvancedFilters] =
    useState<AdvancedDeviceFiltersType>(initialAdvancedFilters);
  const [appliedAdvancedFilters, setAppliedAdvancedFilters] =
    useState<AdvancedDeviceFiltersType>(initialAdvancedFilters);

  const debouncedSearch = useDebounce(filters.search, 500);
  const queryFilters = {
    ...filters,
    ...appliedAdvancedFilters,
    search: debouncedSearch,
  };

  const citiesOptions =
    cities.map(({ label, value }) => ({
      label,
      value,
    })) ?? [];

  const warehousesOptions = warehouses.map((warehouse) => ({
    value: warehouse.id,
    label: warehouse.name,
  }));

  const statusesOptions = statuses.map((status) => ({
    value: status.value,
    label: status.label,
  }));

  const availableOptions = availableStatus.map((status) => ({
    value: status.value,
    label: status.label,
  }));

  const manufacturersOptions = manufacturers.map((manufacturer) => ({
    value: manufacturer.id,
    label: manufacturer.name,
  }));

  const typesOptions = types.map((type) => ({
    value: type.id,
    label: type.name,
  }));

  const handleWarehouseChange = (value: string[]) => {
    setFilters((prev) => ({
      ...prev,
      warehouseIds: value,
    }));
    updateSearchParam('warehouseId', value);
  };

  const handleStatusChange = (value?: string) => {
    setFilters((prev) => ({
      ...prev,
      isFunctional: value === undefined ? null : value === 'true',
    }));
  };

  const handleAssignedChange = (value: string) => {
    setAdvancedFilters((prev) => ({
      ...prev,
      isAvailable: value === undefined ? null : value === 'true',
    }));
  };

  const handleDisplaySize = (value: [number, number]) => {
    setAdvancedFilters((prev) => ({
      ...prev,
      displaySize: value,
    }));
  };

  const handleMemorySize = (value: [number, number]) => {
    setAdvancedFilters((prev) => ({
      ...prev,
      memorySize: value,
    }));
  };
  const handleTypeChange = (value: string[]) => {
    setAdvancedFilters((prev) => ({
      ...prev,
      typeIds: value,
    }));
  };

  const handleManufacturerChange = (value: string[]) => {
    setAdvancedFilters((prev) => ({
      ...prev,
      manufacturerIds: value,
    }));
  };

  const handleSearchChange = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      search: value,
    }));
  };
  const handleResetFilters = () => {
    setFilters(initialFilters);
    setAdvancedFilters(initialAdvancedFilters);
    setAppliedAdvancedFilters(initialAdvancedFilters);

    resetSearchParams();
  };
  const handleResetAdvancedFilters = () => {
    setAdvancedFilters(initialAdvancedFilters);
  };

  const handleApply = () => {
    setAppliedAdvancedFilters(advancedFilters);
    updateSearchParams({
      manufacturerIds: advancedFilters.manufacturerIds,
      typeIds: advancedFilters.typeIds,
      displaySize: advancedFilters.displaySize,
      memorySize: advancedFilters.memorySize,
      isAvailable: advancedFilters.isAvailable,
    });
  };

  return {
    filters,
    queryFilters,
    advancedFilters,
    citiesOptions,
    warehousesOptions,
    statusesOptions,
    availableOptions,
    manufacturersOptions,
    typesOptions,
    handleWarehouseChange,
    handleStatusChange,
    handleAssignedChange,
    handleSearchChange,
    handleTypeChange,
    handleManufacturerChange,
    handleDisplaySize,
    handleMemorySize,
    handleResetFilters,
    handleResetAdvancedFilters,
    handleApply,
  };
};
