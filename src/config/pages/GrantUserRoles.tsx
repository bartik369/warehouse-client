import GrantUserRoles from '@/pages/admin/roles2/GrantUserRoles';

const GrantUserRolesConfig = {
  title: 'Grant access',
  path: '/admin/grant-access',
  element: <GrantUserRoles />,
  requireAuth: true,
};
export default GrantUserRolesConfig;
