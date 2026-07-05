import Device from '@/pages/device/Device';

const DeviceConfig = {
  title: 'Device',
  path: '/devices/:id',
  element: <Device />,
  requireAuth: true,
};
export default DeviceConfig;
