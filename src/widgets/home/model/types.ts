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

export type ChartPeriods = {
  deviceAdditions: Period;
  deviceMovements: Period;
};

export type InventoryStatus = 'in_progress' | 'completed';

export interface InventoryOverviewItem {
  id: string;
  processId: number;
  warehouse: {
    id: string;
    name: string;
  };
  status: InventoryStatus;
  expectedCount: number;
  foundCount: number;
  discrepancyCount: number;
  createdAt: string;
  completedAt: string | null;
}

export interface InventoryOverviewResponse {
  active: InventoryOverviewItem;
  completed: InventoryOverviewItem;
}

export const inventoryStatus = {
  completed: 'Завершена',
  in_progress: 'В процессе',
} as const;
