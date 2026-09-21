import { useState } from 'react';

import { appToast } from '@/shared/lib/toast/toast';
import { FormMode } from '@/shared/types/form';
import {
  useCreateTypeMutation,
  useGetTypeQuery,
  useGetTypesQuery,
  useUpdateTypeMutation,
} from '@/store/api/typesApi';

import { NOTIFICATIONS } from './constants';
import { TypeFormValues } from './schema';

export const useManageType = () => {
  const [createType] = useCreateTypeMutation();
  const [updateType] = useUpdateTypeMutation();
  const [editingId, setEditingId] = useState<string | null>(null);
  const { data: editingType } = useGetTypeQuery(editingId!, {
    skip: !editingId,
  });

  const {
    data: types = [],
    isFetching: typesFetching,
    isLoading: typesLoading,
  } = useGetTypesQuery();
  const mode: FormMode = editingId ? 'update' : 'create';

  const handleSubmit = async (data: TypeFormValues) => {
    if (editingId) {
      await updateType({
        id: editingId,
        ...data,
      }).unwrap();
      setEditingId(null);
      appToast.success(NOTIFICATIONS.updated);
      return;
    }
    await createType(data).unwrap();
    appToast.success(NOTIFICATIONS.created);
  };

  const handleDeleteType = async (id: string) => {
    console.log('test delete', id);
  };

  const handleGetType = (id: string) => {
    if (!id) return;
    setEditingId(id);
  };
  const handleResetId = () => {
    setEditingId(null);
  };

  return {
    mode,
    types,
    editingType,
    typesFetching,
    typesLoading,
    onSave: handleSubmit,
    onEdit: handleGetType,
    onDelete: handleDeleteType,
    resetId: handleResetId,
  };
};
