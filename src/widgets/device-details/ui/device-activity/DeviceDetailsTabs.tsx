import { Tabs } from 'antd';

import { DeviceHistory } from './history/DeviceHistory';

export const DeviceDetailsTabs = () => {
  const items = [
    {
      key: 'history',
      label: 'История',
      children: <DeviceHistory />,
    },
  ];
  return <Tabs items={items} />;
};
