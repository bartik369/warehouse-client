import { SegmentedProps } from 'antd';

import { DeviceAdditionsPeriod } from './types';

export const categoryColors: Record<string, string> = {
  laptop: 'var(--blue-500)',
  tv: 'var(--blue-400)',
  mobile_phone: 'var(--blue-300)',
  accessory: 'var(--green-500)',
  monitor: 'var(--green-400)',
  desktop_phone: 'var(--green-300)',
  network: 'var(--yellow-500)',
  printer: 'var(--yellow-400)',
  projector: 'var(--yellow-400)',
  desktop: 'var(--red-500)',
  toner: 'var(--gray-500)',
};

export const TITLES = {
  deviceCategories: 'Устройства по категориям',
  deviceAdditions: 'Динамика добавления устройств',
};

export const additionsPeriods: SegmentedProps<DeviceAdditionsPeriod>['options'] = [
  { label: '6 мес', value: '6m' },
  { label: '12 мес', value: '12m' },
  { label: 'Всё время', value: '24m' },
];

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
