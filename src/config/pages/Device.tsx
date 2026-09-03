import DevicePage from '@/pages/device/DevicePage';

const DeviceConfig = {
  title: 'DevicePage',
  path: '/devices/:id',
  element: <DevicePage />,
  requireAuth: true,
};
export default DeviceConfig;
