import { AppRouteConfig } from '@/app/router/config/types';
import InventoryListPage from '@/pages/inventory/InventoryList';

const InventoryListConfig = {
  title: 'Inventory list',
  path: '/inventory',
  element: <InventoryListPage />,
  requireAuth: true,
  layout: 'wide',
} satisfies AppRouteConfig;
export default InventoryListConfig;
