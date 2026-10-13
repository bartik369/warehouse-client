import { AppRouteConfig } from '@/app/router/config/types';
import UsersPage from '@/pages/admin/users/UsersPage';

const UsersConfig = {
  title: 'Users',
  path: '/admin/users',
  element: <UsersPage />,
  requireAuth: true,
  layout: 'default',
} satisfies AppRouteConfig;
export default UsersConfig;
