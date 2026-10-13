import { AppRouteConfig } from '@/app/router/config/types';
import TypesPage from '@/pages/admin/type/TypesPage';

const TypesConfig = {
  title: 'AddType',
  path: '/admin/add-type',
  element: <TypesPage />,
  requireAuth: true,
  layout: 'default',
} satisfies AppRouteConfig;
export default TypesConfig;
