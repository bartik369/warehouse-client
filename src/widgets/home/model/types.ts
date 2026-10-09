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

export type Period = '6m' | '12m' | '24m';

export interface DeviceMovementItem {
  month: string;
  issued: number;
  returned: number;
}

export interface DeviceMovementsResponse {
  period: Period;
  items: DeviceMovementItem[];
}
