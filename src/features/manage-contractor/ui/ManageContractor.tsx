import { Card, Flex } from 'antd';

import { AdminEntityList } from '@/shared/ui/admin-entity-list/AdminEntityList';
import { PageHeader } from '@/shared/ui/page-header/PageHeader';

import { DESCRIPTION, TITLE } from '../model/constants';
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
    <Flex vertical>
      <PageHeader title={TITLE} description={DESCRIPTION} />
      <Flex gap={20} className={styles.container}>
        <Card className={styles.card}>
          <ContractorForm data={editingContractor} mode={mode} resetId={resetId} onSave={onSave} />
        </Card>
        <Card className={styles.card}>
          <AdminEntityList
            loading={contractorsLoading}
            fetching={contractorsFetching}
            items={contractors}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </Card>
      </Flex>
    </Flex>
  );
};
