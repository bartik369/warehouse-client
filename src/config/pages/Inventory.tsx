import { AppRouteConfig } from '@/app/router/config/types';
import InventoryPage from '@/pages/inventory/Inventory';

const InventoryConfig = {
  title: 'Inventory',
  path: '/inventory/inventory-create',
  element: <InventoryPage />,
  requireAuth: true,
  layout: 'default',
} satisfies AppRouteConfig;

export default InventoryConfig;
