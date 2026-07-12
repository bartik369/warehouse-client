import { Flex } from 'antd';

import { AdminEntityList } from '@/shared/ui/admin-entity-list/AdminEntityList';

import { useManageLocation } from '../model/useManageLocation';
import { LocationForm } from './LocationForm';

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
    <Flex gap={20}>
      <LocationForm data={editingLocation} mode={mode} resetId={resetId} onSave={onSave} />
      <AdminEntityList
        loading={locationsLoading}
        fetching={locationsFetching}
        items={locations}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </Flex>
  );
};
