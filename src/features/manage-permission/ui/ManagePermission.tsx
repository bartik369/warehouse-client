import { Flex } from 'antd';

import { AdminEntityList } from '@/shared/ui/admin-entity-list/AdminEntityList';

import { useManagePermission } from '../model/useManagePermission';
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
    <Flex gap={20}>
      <PermissionForm data={editingPermission} mode={mode} resetId={resetId} onSave={onSave} />
      <AdminEntityList
        loading={permissionsLoading}
        fetching={permissionsFetching}
        items={permissions}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </Flex>
  );
};
