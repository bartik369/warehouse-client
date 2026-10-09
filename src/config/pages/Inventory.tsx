import InventoryPage from '@/pages/inventory/Inventory';

const InventoryConfig = {
  title: 'Inventory',
  path: '/inventory/inventory-create',
  element: <InventoryPage />,
  requireAuth: true,
};

export default InventoryConfig;
