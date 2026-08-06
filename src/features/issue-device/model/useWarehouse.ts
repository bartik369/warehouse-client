import { useMemo, useState } from 'react';

import { Warehouse } from '@/entities/warehouse/model/types';
import { useGetLocationsQuery } from '@/store/api/locationApi';
import { useGetWarehousesQuery } from '@/store/api/warehousesApi';

export const useWarehouse = () => {
  const [warehouse, setWarehouse] = useState<Warehouse | null>(null);
  const { data: warehouses = [], isLoading: isLoadingWarehouses } = useGetWarehousesQuery();
  const { data: locations = [], isLoading: isLoadingLocations } = useGetLocationsQuery();

  const handleSelect = (warehouse: Warehouse) => {
    if (!warehouse) return;
    setWarehouse(warehouse);
  };
  const locationName = useMemo(() => {
    if (!warehouse?.id || locations.length === 0) return;
    return locations.find((item) => item.id === warehouse.locationId)?.name;
  }, [locations, warehouse?.locationId]);

  const handleReset = () => {
    setWarehouse(null);
  };

  return {
    locationName,
    warehouse,
    warehouses,
    locations,
    isLoadingWarehouses,
    isLoadingLocations,
    handleSelect,
    handleReset,
  };
};
