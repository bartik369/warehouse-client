import { Flex } from 'antd';

import { AdminEntityList } from '@/shared/ui/admin-entity-list/AdminEntityList';

import { useManageManufacturer } from '../model/useManageManufacturer';
import styles from './ManageManufacturer.module.scss';
import { ManufacturerForm } from './ManufacturerForm';

export const ManageManufacturer = () => {
  const {
    manufacturers,
    editingManufacturer,
    mode,
    manufacturersLoading,
    manufacturersFetching,
    onEdit,
    onSave,
    onDelete,
    resetId,
  } = useManageManufacturer();
  return (
    <Flex gap={20} className={styles.page}>
      <div className={styles.formColumn}>
        <ManufacturerForm
          data={editingManufacturer}
          mode={mode}
          resetId={resetId}
          onSave={onSave}
        />
      </div>
      <div className={styles.listColumn}>
        <AdminEntityList
          loading={manufacturersLoading}
          fetching={manufacturersFetching}
          items={manufacturers}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>
    </Flex>
  );
};
