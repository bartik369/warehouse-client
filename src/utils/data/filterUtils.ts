import { DeviceFilters } from '@/types/devices';

export const formatFiltersToSearchParams = (filters: DeviceFilters): Record<string, string> => {
  const params: Record<string, string> = {};

  Object.entries(filters).forEach(([key, values]) => {
    if (Array.isArray(values) && values.length > 0) {
      params[key] = values.join(',');
    }
  });
  return params;
};
