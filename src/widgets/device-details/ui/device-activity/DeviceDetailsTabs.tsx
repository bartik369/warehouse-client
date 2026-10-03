import { Tabs } from 'antd';

import { TableTypography } from '@/types/typography';

import { DeviceHistoryItem } from '../../model/types';
import { DeviceHistoryTable } from './history/DeviceHistoryTable';

interface DeviceDetailsTabsProps {
  page: number;
  limit: number;
  isHistoryLoading: boolean;
  deviceHistory: DeviceHistoryItem[];
}

export const DeviceDetailsTabs = ({
  deviceHistory,
  isHistoryLoading,
  page,
  limit,
}: DeviceDetailsTabsProps) => {
  const items = [
    {
      key: 'history',
      label: 'История',
      children: (
        <DeviceHistoryTable
          typography="small"
          data={deviceHistory}
          loading={isHistoryLoading}
          page={page}
          limit={limit}
        />
      ),
    },
  ];
  return <Tabs items={items} />;
};
