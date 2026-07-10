import { Flex } from 'antd';

import { AdminEntityList } from '@/shared/ui/admin-entity-list/AdminEntityList';

import { useManageManufacturer } from '../model/useManageManufacturer';
import { ManufacturerForm } from './ManufacturerForm';

export const ManageManufacturer = () => {
  const { manufacturers, editingManufacturer, mode, onEdit, onSave, resetId } =
    useManageManufacturer();
  return (
    <Flex gap={20}>
      <ManufacturerForm data={editingManufacturer} mode={mode} resetId={resetId} onSave={onSave} />
      <AdminEntityList items={manufacturers} onEdit={onEdit} />
    </Flex>
  );
};
