import { Card, Flex, Typography } from 'antd';

import { PageHeader } from '@/shared/ui/page-header/PageHeader';

import { DESCRIPTION, TITLES } from '../model/constants';
import { useManagePermissionRole } from '../model/useManagePermissionRole';
import { useRolePermissionsTableController } from '../model/useRolePermissionsTableController';
import styles from './ManagePermissionRole.module.scss';
import { PermissionsRoleForm } from './permission-role-form/PermissionsRoleForm';
import { PermissionsRoleTable } from './permission-role-table/PermissionRoleTable';

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
    onSave,
    onEdit,
    onDelete,
  } = useManagePermissionRole();

  const {
    permissionRoles,
    page,
    limit,
    totalCount,
    setPage,
    setLimit,
    permissionRolesLoading,
    permissionRolesFetching,
  } = useRolePermissionsTableController();

  return (
    <Flex vertical>
      <PageHeader title={TITLES.MANAGE_PERMISSIONS_ROLE} description={DESCRIPTION} />
      <Flex className={styles.container}>
        <Card className={styles.card}>
          <Typography.Title className={styles.blockTitle} level={2}>
            {TITLES.PERMISSIONS_ROLE_LIST}
          </Typography.Title>
          <PermissionsRoleTable
            typography="small"
            data={permissionRoles}
            loading={permissionRolesLoading}
            limit={limit}
            page={page}
            totalCount={totalCount}
            onEdit={onEdit}
            onDelete={onDelete}
            setLimit={setLimit}
            setPage={setPage}
          />
        </Card>
        <Card className={styles.card}>
          <Typography.Title className={styles.blockTitle} level={2}>
            {TITLES.PERMISSIONS_ROLE_ACTIONS}
          </Typography.Title>
          {/* <PermissionList
            loading={permissionRolesLoading}
            fetching={permissionRolesFetching}
            roles={permissionRoles}
            onEdit={onEdit}
            onDelete={onDelete}
          /> */}
          <PermissionsRoleForm
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
      </Flex>
    </Flex>
  );
};
