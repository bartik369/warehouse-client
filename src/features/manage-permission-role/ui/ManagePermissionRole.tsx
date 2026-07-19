import { Flex } from 'antd';

import { useManagePermissionRole } from '../model/useManagePermissionRole';
import { PermissionRoleForm } from './permission-role-form/PermissionRoleForm';
import { PermissionList } from './permission-role-list/PermissionList';

export const ManagePermissionRole = () => {
  const {
    resetId,
    mode,
    roles,
    locations,
    selectedPermissionRoles,
    warehouseOptions,
    roleOptions,
    locationOptions,
    permissionOptions,
    permissions,
    permissionRoles,
    permissionRolesFetching,
    permissionRolesLoading,
    onSave,
    onEdit,
    onDelete,
  } = useManagePermissionRole();
  return (
    <Flex gap={20}>
      <PermissionRoleForm
        roles={roles}
        locations={locations}
        selectedRole={selectedPermissionRoles}
        warehouseOptions={warehouseOptions}
        roleOptions={roleOptions}
        locationOptions={locationOptions}
        permissionOptions={permissionOptions}
        permissions={permissions}
        permissionRoles={permissionRoles}
        mode={mode}
        resetId={resetId}
        onSave={onSave}
      />
      <PermissionList roles={permissionRoles} onEdit={onEdit} onDelete={onDelete} />
    </Flex>
  );
};
