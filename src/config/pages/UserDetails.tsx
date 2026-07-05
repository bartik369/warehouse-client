import type { AppRouteConfig } from '@/app/router/config/types';
import UserDetails from '@/pages/admin/users/UserDetails';

const UserDetailsConfig: AppRouteConfig[] = [
  {
    title: 'Users',
    path: '/users/:id',
    element: <UserDetails />,
    requireAuth: true,
  },
  {
    title: 'Users',
    path: '/admin/users/:id',
    element: <UserDetails />,
    requireAuth: true,
  },
];

export default UserDetailsConfig;
