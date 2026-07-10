import { useState } from 'react';

import {
  useCreateManufacturerMutation,
  useGetManufacturerQuery,
  useGetManufacturersQuery,
  useUpdateManufacturerMutation,
} from '@/store/api/manufacturersApi';

import { ManufacturerFormValues } from './schema';
import { FormMode } from './types';

export const useManageManufacturer = () => {
  const [createManufacturer] = useCreateManufacturerMutation();
  const [updateManufacturer] = useUpdateManufacturerMutation();
  const [editingId, setEditingId] = useState<string | null>(null);
  const { data: editingManufacturer } = useGetManufacturerQuery(editingId!, {
    skip: !editingId,
  });

  const { data: manufacturers = [] } = useGetManufacturersQuery();
  const mode: FormMode = editingId ? 'update' : 'create';

  const handleSubmit = async (data: ManufacturerFormValues) => {
    if (editingId) {
      await updateManufacturer({
        id: editingId,
        ...data,
      }).unwrap();
      setEditingId(null);
      return;
    }
    await createManufacturer(data).unwrap();
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
    onSave: handleSubmit,
    onEdit: handleGetManufacturer,
    resetId: handleResetId,
  };
};
