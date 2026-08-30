import { useState } from 'react';

import { useGetManufacturersQuery } from '@/store/api/manufacturersApi';
import { useGetTypesQuery } from '@/store/api/typesApi';
import { useGetWarehousesQuery } from '@/store/api/warehousesApi';

import { cities } from './constants';
import { DeviceFiltersType } from './types';

export const useDeviceFilters = () => {
  const initialFilters: DeviceFiltersType = {
    warehouseIds: [],
    displaySize: null,
    memorySize: null,
    typeIds: [],
    manufacturerIds: [],
    isFunctional: null,
    isAvailable: null,
    search: '',
  };
  const { data: warehouses = [] } = useGetWarehousesQuery();
  const { data: manufacturers = [] } = useGetManufacturersQuery();
  const { data: types = [] } = useGetTypesQuery();

  const [filters, setFilters] = useState(initialFilters);

  const statuses = [
    {
      label: 'Работает',
      value: 'true',
    },
    {
      label: 'Не работает',
      value: 'false',
    },
  ];

  const availableStatus = [
    {
      label: 'Используется',
      value: 'false',
    },
    {
      label: 'Не используется',
      value: 'true',
    },
  ];

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
  };

  const handleStatusChange = (value?: string) => {
    setFilters((prev) => ({
      ...prev,
      isFunctional: value === undefined ? null : value === 'true',
    }));
  };

  const handleAssignedChange = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      isAvailable: value === undefined ? null : value === 'true',
    }));
  };

  const handleDisplaySize = (value: [number, number]) => {
    setFilters((prev) => ({
      ...prev,
      displaySize: value,
    }));
  };

  const handleMemorySize = (value: [number, number]) => {
    setFilters((prev) => ({
      ...prev,
      memorySize: value,
    }));
  };
  const handleTypeChange = (value: string[]) => {
    setFilters((prev) => ({
      ...prev,
      typeIds: value,
    }));
  };

  const handleManufacturerChange = (value: string[]) => {
    setFilters((prev) => ({
      ...prev,
      manufacturerIds: value,
    }));
  };

  const handleSearchChange = (value: string) => {};

  return {
    filters,
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
  };
};
