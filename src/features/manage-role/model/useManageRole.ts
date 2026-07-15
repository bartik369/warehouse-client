import { useState } from 'react';

import { appToast } from '@/shared/lib/toast/toast';
import { FormMode } from '@/shared/types/form';
import {
  useCreateRoleMutation,
  useGetRoleQuery,
  useGetRolesQuery,
  useUpdateRoleMutation,
} from '@/store/api/rolesApi';

import { NOTIFICATIONS } from './constants';
import { RoleFormValues } from './schema';

export const useManageRole = () => {
  const [createRole] = useCreateRoleMutation();
  const [updateRole] = useUpdateRoleMutation();
  const [editingId, setEditingId] = useState<string | null>(null);
  const { data: editingRole } = useGetRoleQuery(editingId!, {
    skip: !editingId,
  });

  const {
    data: roles = [],
    isFetching: rolesFetching,
    isLoading: rolesLoading,
  } = useGetRolesQuery();
  const mode: FormMode = editingId ? 'update' : 'create';

  const handleSubmit = async (data: RoleFormValues) => {
    if (editingId) {
      await updateRole({
        id: editingId,
        ...data,
      }).unwrap();
      setEditingId(null);
      appToast.success(NOTIFICATIONS.updated);
      return;
    }
    await createRole(data).unwrap();
    appToast.success(NOTIFICATIONS.created);
  };

  const handleDeleteRole = async (id: string) => {
    console.log('test delete', id);
  };

  const handleGetRole = (id: string) => {
    if (!id) return;
    setEditingId(id);
  };
  const handleResetId = () => {
    setEditingId(null);
  };

  return {
    mode,
    roles,
    editingRole,
    rolesFetching,
    rolesLoading,
    onSave: handleSubmit,
    onEdit: handleGetRole,
    onDelete: handleDeleteRole,
    resetId: handleResetId,
  };
};
