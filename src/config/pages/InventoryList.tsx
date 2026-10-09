import InventoryListPage from '@/pages/inventory/InventoryList';

const InventoryListConfig = {
  title: 'Inventory list',
  path: '/inventory',
  element: <InventoryListPage />,
  requireAuth: true,
};
export default InventoryListConfig;
