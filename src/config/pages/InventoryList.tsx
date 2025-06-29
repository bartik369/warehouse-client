import InventoryList from "@/components/pages/inventory/InventoryList";

const InventoryListConfig = {
    title: 'Inventory',
    path: '/inventory',
    element: <InventoryList />,
    requireAuth: true,
}
export default InventoryListConfig;