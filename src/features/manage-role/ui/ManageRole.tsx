import { Card, Flex } from 'antd';

import { AdminEntityList } from '@/shared/ui/admin-entity-list/AdminEntityList';
import { PageHeader } from '@/shared/ui/page-header/PageHeader';

import { DESCRIPTION, TITLE } from '../model/constants';
import { useManageRole } from '../model/useManageRole';
import styles from './ManageRole.module.scss';
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
    <Flex vertical>
      <PageHeader title={TITLE} description={DESCRIPTION} />
      <Flex className={styles.container}>
        <Card className={styles.card}>
          <RoleForm data={editingRole} mode={mode} resetId={resetId} onSave={onSave} />
        </Card>
        <Card className={styles.card}>
          <AdminEntityList
            loading={rolesLoading}
            fetching={rolesFetching}
            items={roles}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </Card>
      </Flex>
    </Flex>
  );
};
