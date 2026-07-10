import WarehousesPage from '@/pages/admin/warehouses/WarehousesPage';

const WarehousesConfig = {
  title: 'Управление складами',
  path: '/admin/warehouses',
  element: <WarehousesPage />,
  requireAuth: true,
};
export default WarehousesConfig;
