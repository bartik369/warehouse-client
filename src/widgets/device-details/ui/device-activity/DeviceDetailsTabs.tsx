import { Tabs } from 'antd';

import { DeviceHistoryItem } from '../../model/types';
import { DeviceHistoryTable } from './history/DeviceHistoryTable';

interface DeviceDetailsTabsProps {
  isHistoryLoading: boolean;
  deviceHistory: DeviceHistoryItem[];
}

export const DeviceDetailsTabs = ({ deviceHistory, isHistoryLoading }: DeviceDetailsTabsProps) => {
  const items = [
    {
      key: 'history',
      label: 'История',
      children: <DeviceHistoryTable data={deviceHistory} loading={isHistoryLoading} />,
    },
  ];
  return <Tabs items={items} />;
};
