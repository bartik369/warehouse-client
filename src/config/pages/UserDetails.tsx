import type { AppRouteConfig } from '@/app/router/config/types';
import UserDetailsPage from '@/pages/admin/users/UserDetails';

const UserDetailsConfig: AppRouteConfig[] = [
  {
    title: 'Users',
    path: '/users/:id',
    element: <UserDetailsPage />,
    requireAuth: true,
    layout: 'default',
  } satisfies AppRouteConfig,
  {
    title: 'Users',
    path: '/admin/users/:id',
    element: <UserDetailsPage />,
    requireAuth: true,
    layout: 'default',
  } satisfies AppRouteConfig,
];

export default UserDetailsConfig;
