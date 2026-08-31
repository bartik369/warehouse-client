export type DeviceFiltersType = {
  warehouseIds: string[];
  isFunctional: boolean | null;
  search: string;
};

export type AdvancedDeviceFiltersType = {
  typeIds: string[];
  manufacturerIds: string[];
  displaySize: [number, number] | null;
  memorySize: [number, number] | null;
  isAvailable: boolean | null;
};
