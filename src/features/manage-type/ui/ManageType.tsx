import { Flex } from 'antd';

import { AdminEntityList } from '@/shared/ui/admin-entity-list/AdminEntityList';

import { useManageType } from '../model/useManageType';
import styles from './ManageType.module.scss';
import { TypeForm } from './TypeForm';

export const ManageType = () => {
  const {
    types,
    editingType,
    mode,
    typesLoading,
    typesFetching,
    onEdit,
    onSave,
    onDelete,
    resetId,
  } = useManageType();
  return (
    <Flex gap={20} className={styles.page}>
      <div className={styles.formColumn}>
        <TypeForm data={editingType} mode={mode} resetId={resetId} onSave={onSave} />
      </div>
      <div className={styles.listColumn}>
        <AdminEntityList
          loading={typesLoading}
          fetching={typesFetching}
          items={types}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>
    </Flex>
  );
};
