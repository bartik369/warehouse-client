import { Flex } from 'antd';

import { AdminEntityList } from '@/shared/ui/admin-entity-list/AdminEntityList';

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
    <Flex gap={20} className={styles.page}>
      <div className={styles.formColumn}>
        <DepartmentForm data={editingDepartment} mode={mode} resetId={resetId} onSave={onSave} />
      </div>
      <div className={styles.listColumn}>
        <AdminEntityList
          loading={departmentsLoading}
          fetching={departmentsFetching}
          items={departments}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>
    </Flex>
  );
};
