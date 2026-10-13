import { AppRouteConfig } from '@/app/router/config/types';
import WarehousesPage from '@/pages/admin/warehouses/WarehousesPage';

const WarehousesConfig = {
  title: 'Управление складами',
  path: '/admin/warehouses',
  element: <WarehousesPage />,
  requireAuth: true,
  layout: 'default',
} satisfies AppRouteConfig;
export default WarehousesConfig;
