import RolesPage from '@/pages/admin/role/roles/RolesPage';

const RolesConfig = {
  title: 'Roles',
  path: '/admin/roles',
  element: <RolesPage />,
  requireAuth: true,
};
export default RolesConfig;
