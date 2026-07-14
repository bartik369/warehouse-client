import { useState } from 'react';

import { appToast } from '@/shared/lib/toast/toast';
import { FormMode } from '@/shared/types/form';
import {
  useCreateContractorMutation,
  useGetContractorQuery,
  useGetContractorsQuery,
  useUpdateContractorMutation,
} from '@/store/api/contractorApi';

import { NOTIFICATIONS } from './constants';
import { ContractorFormValues } from './schema';

export const useManageContractor = () => {
  const [createContractor] = useCreateContractorMutation();
  const [updateContractor] = useUpdateContractorMutation();
  const [editingId, setEditingId] = useState<string | null>(null);
  const { data: editingContractor } = useGetContractorQuery(editingId!, {
    skip: !editingId,
  });

  const {
    data: contractors = [],
    isFetching: contractorsFetching,
    isLoading: contractorsLoading,
  } = useGetContractorsQuery();
  const mode: FormMode = editingId ? 'update' : 'create';

  const handleSubmit = async (data: ContractorFormValues) => {
    if (editingId) {
      await updateContractor({
        id: editingId,
        ...data,
      }).unwrap();
      setEditingId(null);
      appToast.success(NOTIFICATIONS.updated);
      return;
    }
    await createContractor(data).unwrap();
    appToast.success(NOTIFICATIONS.created);
  };

  const handleDeleteContractor = async (id: string) => {
    console.log('test delete', id);
  };

  const handleGetContractor = (id: string) => {
    if (!id) return;
    setEditingId(id);
  };
  const handleResetId = () => {
    setEditingId(null);
  };

  return {
    mode,
    contractors,
    editingContractor,
    contractorsFetching,
    contractorsLoading,
    onSave: handleSubmit,
    onEdit: handleGetContractor,
    onDelete: handleDeleteContractor,
    resetId: handleResetId,
  };
};
