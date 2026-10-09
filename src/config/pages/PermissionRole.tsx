import { PermissionRolePage } from '@/pages/admin/permission-role/PermissionRolePage';

const PermissionRoleConfig = {
  title: 'Доступы роли',
  path: '/admin/permission_roles',
  element: <PermissionRolePage />,
  requireAuth: true,
};
export default PermissionRoleConfig;
