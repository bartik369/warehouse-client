import { Flex } from 'antd';

import { AdminEntityList } from '@/shared/ui/admin-entity-list/AdminEntityList';

import { useManageContractor } from '../model/useManageContactor';
import { ContractorForm } from './ContractorForm';
import styles from './ManageContractor.module.scss';

export const ManageContractor = () => {
  const {
    contractors,
    editingContractor,
    mode,
    contractorsLoading,
    contractorsFetching,
    onEdit,
    onSave,
    onDelete,
    resetId,
  } = useManageContractor();
  return (
    <Flex gap={20} className={styles.page}>
      <div className={styles.formColumn}>
        <ContractorForm data={editingContractor} mode={mode} resetId={resetId} onSave={onSave} />
      </div>
      <div className={styles.listColumn}>
        <AdminEntityList
          loading={contractorsLoading}
          fetching={contractorsFetching}
          items={contractors}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>
    </Flex>
  );
};
