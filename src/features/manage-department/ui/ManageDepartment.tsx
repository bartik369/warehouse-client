import { Card, Flex } from 'antd';

import { AdminEntityList } from '@/shared/ui/admin-entity-list/AdminEntityList';
import { PageHeader } from '@/shared/ui/page-header/PageHeader';

import { DESCRIPTION, TITLE } from '../model/constants';
import { useManageDepartment } from '../model/useManageDepartment';
import { DepartmentForm } from './DepartmentForm';
import styles from './ManageDepartment.module.scss';

export const ManageDepartment = () => {
  const {
    departments,
    editingDepartment,
    mode,
    departmentsLoading,
    departmentsFetching,
    onEdit,
    onSave,
    onDelete,
    resetId,
  } = useManageDepartment();
  return (
    <Flex vertical>
      <PageHeader title={TITLE} description={DESCRIPTION} />
      <Flex gap={20} className={styles.container}>
        <Card className={styles.card}>
          <DepartmentForm data={editingDepartment} mode={mode} resetId={resetId} onSave={onSave} />
        </Card>
        <Card className={styles.card}>
          <AdminEntityList
            loading={departmentsLoading}
            fetching={departmentsFetching}
            items={departments}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </Card>
      </Flex>
    </Flex>
  );
};
