import { Flex } from 'antd';

import { AdminEntityList } from '@/shared/ui/admin-entity-list/AdminEntityList';

import { useManageManufacturer } from '../model/useManageManufacturer';
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
    <Flex gap={20}>
      <ManufacturerForm data={editingManufacturer} mode={mode} resetId={resetId} onSave={onSave} />
      <AdminEntityList
        loading={manufacturersLoading}
        fetching={manufacturersFetching}
        items={manufacturers}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </Flex>
  );
};
