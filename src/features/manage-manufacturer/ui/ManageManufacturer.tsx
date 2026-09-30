import { Card, Flex } from 'antd';

import { AdminEntityList } from '@/shared/ui/admin-entity-list/AdminEntityList';
import { PageHeader } from '@/shared/ui/page-header/PageHeader';

import { DESCRIPTION, TITLE } from '../model/constants';
import { useManageManufacturer } from '../model/useManageManufacturer';
import styles from './ManageManufacturer.module.scss';
import { ManufacturerForm } from './ManufacturerForm';

export const ManageManufacturer = () => {
  const {
    manufacturers,
    editingManufacturer,
    mode,
    manufacturersLoading,
    manufacturersFetching,
    onEdit,
    onSave,
    onDelete,
    resetId,
  } = useManageManufacturer();
  return (
    <Flex vertical>
      <PageHeader title={TITLE} description={DESCRIPTION} />
      <Flex className={styles.container}>
        <Card className={styles.card}>
          <ManufacturerForm
            data={editingManufacturer}
            mode={mode}
            resetId={resetId}
            onSave={onSave}
          />
        </Card>
        <Card className={styles.card}>
          <AdminEntityList
            loading={manufacturersLoading}
            fetching={manufacturersFetching}
            items={manufacturers}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </Card>
      </Flex>
    </Flex>
  );
};
