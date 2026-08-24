import { useMemo, useState } from 'react';

import { Warehouse } from '@/entities/warehouse/model/types';
import { useAppDispatch, useAppSelector } from '@/hooks/redux/useRedux';
import { useGetLocationsQuery } from '@/store/api/locationApi';
import { useGetWarehousesQuery } from '@/store/api/warehousesApi';
import { resetWarehouse, setWarehouse } from '@/store/slices/issueSlice';
import { RootState } from '@/store/store';

export const useWarehouse = () => {
  const currentWarehouse = useAppSelector((state: RootState) => state.issue.warehouse);
  const { data: warehouses = [], isLoading: isLoadingWarehouses } = useGetWarehousesQuery();
  const { data: locations = [], isLoading: isLoadingLocations } = useGetLocationsQuery();

  const dispatch = useAppDispatch();

  const handleSelect = (warehouse: Warehouse) => {
    if (!warehouse) return;
    dispatch(setWarehouse(warehouse));
  };

  const locationName = useMemo(() => {
    if (!currentWarehouse?.id || locations.length === 0) return;
    return locations.find((item) => item.id === currentWarehouse.locationId)?.name;
  }, [locations, currentWarehouse?.locationId]);

  const handleReset = () => {
    dispatch(resetWarehouse());
  };

  return {
    locationName,
    currentWarehouse,
    warehouses,
    locations,
    isLoadingWarehouses,
    isLoadingLocations,
    handleSelect,
    handleReset,
  };
};
