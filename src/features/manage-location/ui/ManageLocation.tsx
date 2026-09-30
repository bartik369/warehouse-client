import { Card, Flex } from 'antd';

import { AdminEntityList } from '@/shared/ui/admin-entity-list/AdminEntityList';
import { PageHeader } from '@/shared/ui/page-header/PageHeader';

import { DESCRIPTION, TITLE } from '../model/constants';
import { useManageLocation } from '../model/useManageLocation';
import { LocationForm } from './LocationForm';
import styles from './ManageLocation.module.scss';

export const ManageLocation = () => {
  const {
    locations,
    editingLocation,
    mode,
    locationsLoading,
    locationsFetching,
    onEdit,
    onSave,
    onDelete,
    resetId,
  } = useManageLocation();
  return (
    <Flex vertical>
      <PageHeader title={TITLE} description={DESCRIPTION} />
      <Flex className={styles.container}>
        <Card className={styles.card}>
          <LocationForm data={editingLocation} mode={mode} resetId={resetId} onSave={onSave} />
        </Card>
        <Card className={styles.card}>
          <AdminEntityList
            loading={locationsLoading}
            fetching={locationsFetching}
            items={locations}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </Card>
      </Flex>
    </Flex>
  );
};
