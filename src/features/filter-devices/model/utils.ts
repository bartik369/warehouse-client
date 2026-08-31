type FilterValue = string | number | boolean | null | undefined | unknown[];

export const activeFiltersCount = (filters: Record<string, FilterValue>) => {
  return Object.values(filters).filter((value) => {
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === 'string') return value.trim().length > 0;
    return value != null;
  }).length;
};
