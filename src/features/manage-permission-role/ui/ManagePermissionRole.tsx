import { Card, Flex } from 'antd';

import { PageHeader } from '@/shared/ui/page-header/PageHeader';

import { DESCRIPTION, TITLE } from '../model/constants';
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
    <Flex vertical>
      <PageHeader title={TITLE} description={DESCRIPTION} />
      <Flex className={styles.container}>
        <Card className={styles.card}>
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
        </Card>
        <Card className={styles.card}>
          <PermissionList
            loading={permissionRolesLoading}
            fetching={permissionRolesFetching}
            roles={permissionRoles}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </Card>
      </Flex>
    </Flex>
  );
};
