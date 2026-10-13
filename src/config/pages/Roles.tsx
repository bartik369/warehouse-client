import { AppRouteConfig } from '@/app/router/config/types';
import RolesPage from '@/pages/admin/role/roles/RolesPage';

const RolesConfig = {
  title: 'Roles',
  path: '/admin/roles',
  element: <RolesPage />,
  requireAuth: true,
  layout: 'default',
} satisfies AppRouteConfig;
export default RolesConfig;
