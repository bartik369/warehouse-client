import { AppRouteConfig } from '@/app/router/config/types';
import AddDevicePage from '@/pages/admin/device/AddDevicePage';

const AddDeviceConfig = {
  title: 'AddDevices',
  path: '/admin/add-device',
  element: <AddDevicePage />,
  requireAuth: true,
  layout: 'default',
} satisfies AppRouteConfig;
export default AddDeviceConfig;
