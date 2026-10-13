import { AppRouteConfig } from '@/app/router/config/types';
import AccessPage from '@/pages/admin/access/AccessPage';

const AccessConfig = {
  title: 'Grant access',
  path: '/admin/access',
  element: <AccessPage />,
  requireAuth: true,
  layout: 'default',
} satisfies AppRouteConfig;
export default AccessConfig;
