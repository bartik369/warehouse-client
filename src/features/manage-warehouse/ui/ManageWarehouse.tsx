import { Flex } from 'antd';

import { AdminEntityList } from '@/shared/ui/admin-entity-list/AdminEntityList';

import { useManageWarehouse } from '../model/useManageWarehouse';
import styles from './ManageWarehouse.module.scss';
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
    <Flex gap={20} className={styles.page}>
      <div className={styles.formColumn}>
        <WarehouseForm
          data={editingWarehouse}
          locations={locations}
          mode={mode}
          resetId={resetId}
          onSave={onSave}
        />
      </div>
      <div className={styles.listColumn}>
        <AdminEntityList
          loading={warehousesLoading}
          fetching={warehousesFetching}
          items={warehouses}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>
    </Flex>
  );
};
