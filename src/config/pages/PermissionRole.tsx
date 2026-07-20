import { ManagePermissionRole } from '@/features/manage-permission-role/ui/ManagePermissionRole';

const PermissionRoleConfig = {
  title: 'Доступы роли',
  path: '/admin/permission_roles',
  element: <ManagePermissionRole />,
  requireAuth: true,
};
export default PermissionRoleConfig;
