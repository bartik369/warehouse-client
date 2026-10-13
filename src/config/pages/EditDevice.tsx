import { AppRouteConfig } from '@/app/router/config/types';
import EditDevicePage from '@/pages/admin/device/EditDevicePage';

const EditDeviceConfig = {
  title: 'EditDevice',
  path: '/admin/edit-device',
  element: <EditDevicePage />,
  requireAuth: true,
  layout: 'default',
} satisfies AppRouteConfig;
export default EditDeviceConfig;
