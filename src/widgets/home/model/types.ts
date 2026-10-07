export type DeviceStatistics = {
  total: number;
  assigned: number;
  inStock: number;
  functional: number;
  nonFunctional: number;
  byCategory: {
    typeId: string;
    name: string;
    slug: string;
    count: number;
  }[];
};

export type DeviceAdditionsPeriod = '6m' | '12m' | '24m';
