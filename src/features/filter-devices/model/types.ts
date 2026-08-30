export type DeviceFiltersType = {
  warehouseIds: string[];
  typeIds: string[];
  manufacturerIds: string[];
  displaySize: [number, number] | null;
  memorySize: [number, number] | null;
  isFunctional: boolean | null;
  isAvailable: boolean | null;
  search: string;
};
