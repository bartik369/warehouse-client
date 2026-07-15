import { Flex } from 'antd';

import { AdminEntityList } from '@/shared/ui/admin-entity-list/AdminEntityList';

import { useManageRole } from '../model/useManageRole';
import { RoleForm } from './RoleForm';

export const ManageRole = () => {
  const {
    roles,
    editingRole,
    mode,
    rolesLoading,
    rolesFetching,
    onEdit,
    onSave,
    onDelete,
    resetId,
  } = useManageRole();
  return (
    <Flex gap={20}>
      <RoleForm data={editingRole} mode={mode} resetId={resetId} onSave={onSave} />
      <AdminEntityList
        loading={rolesLoading}
        fetching={rolesFetching}
        items={roles}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </Flex>
  );
};
