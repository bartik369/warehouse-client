import { Flex } from 'antd';

import { AdminEntityList } from '@/shared/ui/admin-entity-list/AdminEntityList';

import { useManageWarehouse } from '../model/useManageWarehouse';
import { WarehouseForm } from './WarehouseForm';

export const ManageWarehouse = () => {
  const {
    warehouses,
    locations,
    editingWarehouse,
    mode,
    warehousesLoading,
    warehousesFetching,
    onEdit,
    onSave,
    onDelete,
    resetId,
  } = useManageWarehouse();
  return (
    <Flex gap={20}>
      <WarehouseForm
        data={editingWarehouse}
        locations={locations}
        mode={mode}
        resetId={resetId}
        onSave={onSave}
      />
      <AdminEntityList
        loading={warehousesLoading}
        fetching={warehousesFetching}
        items={warehouses}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </Flex>
  );
};
