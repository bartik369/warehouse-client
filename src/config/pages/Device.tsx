import { AppRouteConfig } from '@/app/router/config/types';
import DevicePage from '@/pages/device/DevicePage';

const DeviceConfig = {
  title: 'DevicePage',
  path: '/devices/:id',
  element: <DevicePage />,
  requireAuth: true,
  layout: 'default',
} satisfies AppRouteConfig;
export default DeviceConfig;
