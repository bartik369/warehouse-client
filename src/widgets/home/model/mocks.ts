import { DeviceMovementsResponse } from './types';
import type { InventoryOverviewResponse } from './types';

export const mockData = [
  { month: '2025-11', added: 5 },
  { month: '2025-12', added: 8 },
  { month: '2026-01', added: 4 },
  { month: '2026-02', added: 6 },
  { month: '2026-03', added: 10 },
  { month: '2026-04', added: 7 },
  { month: '2026-05', added: 3 },
  { month: '2026-06', added: 7 },
  { month: '2026-07', added: 4 },
  { month: '2026-08', added: 9 },
  { month: '2026-09', added: 5 },
  { month: '2026-10', added: 11 },
];

export const mockDeviceMovements: DeviceMovementsResponse = {
  period: '6m',
  items: [
    { month: '2026-05', issued: 20, returned: 15 },
    { month: '2026-06', issued: 28, returned: 22 },
    { month: '2026-07', issued: 35, returned: 20 },
    { month: '2026-08', issued: 32, returned: 25 },
    { month: '2026-09', issued: 40, returned: 30 },
    { month: '2026-10', issued: 27, returned: 24 },
  ],
};

export const mockInventoryOverview: InventoryOverviewResponse = {
  active: {
    id: 'inventory-14',
    processId: 14,
    warehouse: {
      id: 'warehouse-1',
      name: 'IT-склад 1 этаж',
    },
    status: 'in_progress',
    expectedCount: 29,
    foundCount: 12,
    discrepancyCount: 3,
    createdAt: '2026-10-01T10:00:00Z',
    completedAt: null,
  },

  completed: {
    id: 'inventory-12',
    processId: 12,
    warehouse: {
      id: 'warehouse-2',
      name: 'IT-склад 4 этаж',
    },
    status: 'completed',
    expectedCount: 29,
    foundCount: 28,
    discrepancyCount: 1,
    createdAt: '2026-08-15T09:00:00Z',
    completedAt: '2026-08-16T17:00:00Z',
  },
};
