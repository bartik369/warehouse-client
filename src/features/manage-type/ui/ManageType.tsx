import { Card, Flex } from 'antd';

import { AdminEntityList } from '@/shared/ui/admin-entity-list/AdminEntityList';
import { PageHeader } from '@/shared/ui/page-header/PageHeader';

import { DESCRIPTION, TITLE } from '../model/constants';
import { useManageType } from '../model/useManageType';
import styles from './ManageType.module.scss';
import { TypeForm } from './TypeForm';

export const ManageType = () => {
  const {
    types,
    editingType,
    mode,
    typesLoading,
    typesFetching,
    onEdit,
    onSave,
    onDelete,
    resetId,
  } = useManageType();
  return (
    <Flex vertical>
      <PageHeader title={TITLE} description={DESCRIPTION} />
      <Flex gap={20} className={styles.container}>
        <Card className={styles.card}>
          <TypeForm data={editingType} mode={mode} resetId={resetId} onSave={onSave} />
        </Card>
        <Card className={styles.card}>
          <AdminEntityList
            loading={typesLoading}
            fetching={typesFetching}
            items={types}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </Card>
      </Flex>
    </Flex>
  );
};
