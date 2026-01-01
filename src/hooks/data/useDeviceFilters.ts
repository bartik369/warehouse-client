import { DeviceFilters } from '@/types/devices';
import { useCallback, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const initialFilterState: DeviceFilters = {
  manufacturer: [],
  isFunctional: [],
  isAssigned: [],
  type: [],
  memorySize: [],
  screenSize: [],
  model: [],
  warehouse: [],
};

export const useDeviceFilters = () => {
  const [searchParams] = useSearchParams();

  const initialFilters = useMemo(() => {
    const filter: Partial<DeviceFilters> = {};
    (Object.keys(initialFilterState) as (keyof DeviceFilters)[]).forEach((key) => {
      const value = searchParams.get(key);
      filter[key] = value ? value.split(',') : [];
    });
    return { ...initialFilterState, ...filter };
  }, [searchParams]);

  const [filters, setFilters] = useState<DeviceFilters>(initialFilters);

  const resetFilters = useCallback(() => {
    setFilters(initialFilterState);
  }, []);

  return {
    filters,
    setFilters,
    resetFilters,
  };
};
