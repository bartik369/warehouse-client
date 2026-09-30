import { Card, Flex } from 'antd';

import { AdminEntityList } from '@/shared/ui/admin-entity-list/AdminEntityList';
import { PageHeader } from '@/shared/ui/page-header/PageHeader';

import { DESCRIPTION, TITLE } from '../model/constants';
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
    <Flex vertical>
      <PageHeader title={TITLE} description={DESCRIPTION} />
      <Flex className={styles.container}>
        <Card className={styles.card}>
          <PermissionForm data={editingPermission} mode={mode} resetId={resetId} onSave={onSave} />
        </Card>
        <Card className={styles.card}>
          <AdminEntityList
            loading={permissionsLoading}
            fetching={permissionsFetching}
            items={permissions}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </Card>
      </Flex>
    </Flex>
  );
};
