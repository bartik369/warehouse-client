import { Flex } from 'antd';

import { AdminEntityList } from '@/shared/ui/admin-entity-list/AdminEntityList';

import { useManagePermission } from '../model/useManagePermission';
import styles from './ManagePermission.module.scss';
import { PermissionForm } from './PermissionForm';

export const ManagePermission = () => {
  const {
    permissions,
    editingPermission,
    mode,
    permissionsLoading,
    permissionsFetching,
    onEdit,
    onSave,
    onDelete,
    resetId,
  } = useManagePermission();
  return (
    <Flex gap={20} className={styles.page}>
      <div className={styles.formColumn}>
        <PermissionForm data={editingPermission} mode={mode} resetId={resetId} onSave={onSave} />
      </div>
      <div className={styles.listColumn}>
        <AdminEntityList
          loading={permissionsLoading}
          fetching={permissionsFetching}
          items={permissions}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>
    </Flex>
  );
};
