import { useState } from 'react';

import { appToast } from '@/shared/lib/toast/toast';
import { FormMode } from '@/shared/types/form';
import {
  useCreateDepartmentMutation,
  useGetDepartmentQuery,
  useGetDepartmentsQuery,
  useUpdateDepartmentMutation,
} from '@/store/api/departmentApi';

import { NOTIFICATIONS } from './constants';
import { DepartmentFormValues } from './schema';

export const useManageDepartment = () => {
  const [createDepartment] = useCreateDepartmentMutation();
  const [updateDepartment] = useUpdateDepartmentMutation();
  const [editingId, setEditingId] = useState<string | null>(null);
  const { data: editingDepartment } = useGetDepartmentQuery(editingId!, {
    skip: !editingId,
  });

  const {
    data: departments = [],
    isFetching: departmentsFetching,
    isLoading: departmentsLoading,
  } = useGetDepartmentsQuery();
  const mode: FormMode = editingId ? 'update' : 'create';

  const handleSubmit = async (data: DepartmentFormValues) => {
    if (editingId) {
      await updateDepartment({
        id: editingId,
        ...data,
      }).unwrap();
      setEditingId(null);
      appToast.success(NOTIFICATIONS.updated);
      return;
    }
    await createDepartment(data).unwrap();
    appToast.success(NOTIFICATIONS.created);
  };

  const handleDeleteDepartment = async (id: string) => {
    console.log('test delete', id);
  };

  const handleGetDepartment = (id: string) => {
    if (!id) return;
    setEditingId(id);
  };
  const handleResetId = () => {
    setEditingId(null);
  };

  return {
    mode,
    departments,
    editingDepartment,
    departmentsFetching,
    departmentsLoading,
    onSave: handleSubmit,
    onEdit: handleGetDepartment,
    onDelete: handleDeleteDepartment,
    resetId: handleResetId,
  };
};
