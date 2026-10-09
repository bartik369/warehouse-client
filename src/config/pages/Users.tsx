import UsersPage from '@/pages/admin/users/UsersPage';

const UsersConfig = {
  title: 'Users',
  path: '/admin/users',
  element: <UsersPage />,
  requireAuth: true,
};
export default UsersConfig;
