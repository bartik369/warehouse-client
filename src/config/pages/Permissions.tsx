import PermissionsPage from '@/pages/admin/permission/PermissionsPage';

const PermissionsConfig = {
  title: 'Permission',
  path: '/admin/permissions',
  element: <PermissionsPage />,
  requireAuth: true,
};
export default PermissionsConfig;
