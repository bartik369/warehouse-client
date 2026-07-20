import { Flex } from 'antd';

import { useManagePermissionRole } from '../model/useManagePermissionRole';
import styles from './ManagePermissionRole.module.scss';
import { PermissionRoleForm } from './permission-role-form/PermissionRoleForm';
import { PermissionList } from './permission-role-list/PermissionList';

export const ManagePermissionRole = () => {
  const {
    resetId,
    mode,
    roles,
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
    <Flex gap={20} className={styles.page}>
      <div className={styles.formColumn}>
        <PermissionRoleForm
          roles={roles}
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
      </div>
      <div className={styles.listColumn}>
        <PermissionList
          loading={permissionRolesLoading}
          fetching={permissionRolesFetching}
          roles={permissionRoles}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>
    </Flex>
  );
};
