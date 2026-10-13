import { AppRouteConfig } from '@/app/router/config/types';
import { PermissionRolePage } from '@/pages/admin/permission-role/PermissionRolePage';

const PermissionRoleConfig = {
  title: 'Доступы роли',
  path: '/admin/permission_roles',
  element: <PermissionRolePage />,
  requireAuth: true,
  layout: 'default',
} satisfies AppRouteConfig;
export default PermissionRoleConfig;
