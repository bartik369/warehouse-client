import { Card, Flex } from 'antd';

import { AdminEntityList } from '@/shared/ui/admin-entity-list/AdminEntityList';
import { PageHeader } from '@/shared/ui/page-header/PageHeader';

import { DESCRIPTION, TITLE } from '../model/constants';
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
    <Flex vertical>
      <PageHeader title={TITLE} description={DESCRIPTION} />
      <Flex className={styles.container}>
        <Card className={styles.card}>
          <WarehouseForm
            data={editingWarehouse}
            locations={locations}
            mode={mode}
            resetId={resetId}
            onSave={onSave}
          />
        </Card>
        <Card className={styles.card}>
          <AdminEntityList
            loading={warehousesLoading}
            fetching={warehousesFetching}
            items={warehouses}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </Card>
      </Flex>
    </Flex>
  );
};
