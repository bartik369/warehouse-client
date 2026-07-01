import type { AppRouteConfig } from '@/app/router/config/types';
import UsersList from '@/components/pages/admin/users/UsersList';

const UsersListConfig: AppRouteConfig[] = [
  {
    title: 'Users',
    path: '/users',
    element: <UsersList />,
    requireAuth: true,
  },
  {
    title: 'Users',
    path: '/admin/users',
    element: <UsersList />,
    requireAuth: true,
  },
];

export default UsersListConfig;
