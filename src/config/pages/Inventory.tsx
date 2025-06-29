import Inventory from "@/components/pages/inventory/Inventory";

const InventoryConfig = {
  title: 'Inventory',
  path: '/inventory/inventory-create',
  element: <Inventory />,
  requireAuth: true,
}

export default InventoryConfig;
