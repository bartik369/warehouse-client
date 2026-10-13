import { AppRouteConfig } from '@/app/router/config/types';
import ManufacturersPage from '@/pages/admin/manufacturer/ManufacturersPage';

const ManufacturersConfig = {
  title: 'Manufacturers',
  path: '/admin/manufacturers',
  element: <ManufacturersPage />,
  requireAuth: true,
  layout: 'default',
} satisfies AppRouteConfig;
export default ManufacturersConfig;
