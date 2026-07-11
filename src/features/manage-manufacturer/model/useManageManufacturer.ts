import { useState } from 'react';

import { appToast } from '@/shared/lib/toast/toast';
import { FormMode } from '@/shared/types/form';
import {
  useCreateManufacturerMutation,
  useGetManufacturerQuery,
  useGetManufacturersQuery,
  useUpdateManufacturerMutation,
} from '@/store/api/manufacturersApi';

import { NOTIFICATIONS } from './constants';
import { ManufacturerFormValues } from './schema';

export const useManageManufacturer = () => {
  const [createManufacturer] = useCreateManufacturerMutation();
  const [updateManufacturer] = useUpdateManufacturerMutation();
  const [editingId, setEditingId] = useState<string | null>(null);
  const { data: editingManufacturer } = useGetManufacturerQuery(editingId!, {
    skip: !editingId,
  });

  const {
    data: manufacturers = [],
    isFetching: manufacturersFetching,
    isLoading: manufacturersLoading,
  } = useGetManufacturersQuery();
  const mode: FormMode = editingId ? 'update' : 'create';

  const handleSubmit = async (data: ManufacturerFormValues) => {
    if (editingId) {
      await updateManufacturer({
        id: editingId,
        ...data,
      }).unwrap();
      setEditingId(null);
      appToast.success(NOTIFICATIONS.updated);
      return;
    }
    await createManufacturer(data).unwrap();
    appToast.success(NOTIFICATIONS.created);
  };

  const handleDeleteManufacturer = async (id: string) => {
    console.log('test delete', id);
  };

  const handleGetManufacturer = (id: string) => {
    if (!id) return;
    setEditingId(id);
  };
  const handleResetId = () => {
    setEditingId(null);
  };

  return {
    mode,
    manufacturers,
    editingManufacturer,
    manufacturersFetching,
    manufacturersLoading,
    onSave: handleSubmit,
    onEdit: handleGetManufacturer,
    onDelete: handleDeleteManufacturer,
    resetId: handleResetId,
  };
};
