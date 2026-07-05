import InventoryList from '@/pages/inventory/InventoryList';

const InventoryListConfig = {
  title: 'Inventory',
  path: '/inventory',
  element: <InventoryList />,
  requireAuth: true,
};
export default InventoryListConfig;
