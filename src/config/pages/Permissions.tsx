import { AppRouteConfig } from '@/app/router/config/types';
import PermissionsPage from '@/pages/admin/permission/PermissionsPage';

const PermissionsConfig = {
  title: 'Permission',
  path: '/admin/permissions',
  element: <PermissionsPage />,
  requireAuth: true,
  layout: 'default',
} satisfies AppRouteConfig;
export default PermissionsConfig;
