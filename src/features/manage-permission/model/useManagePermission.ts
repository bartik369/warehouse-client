import { useState } from 'react';

import { appToast } from '@/shared/lib/toast/toast';
import { FormMode } from '@/shared/types/form';
import {
  useCreatePermissionMutation,
  useGetPermissionQuery,
  useGetPermissionsQuery,
  useUpdatePermissionMutation,
} from '@/store/api/permissionApi';

import { NOTIFICATIONS } from './constants';
import { PermissionFormValues } from './schema';

export const useManagePermission = () => {
  const [createPermission] = useCreatePermissionMutation();
  const [updatePermission] = useUpdatePermissionMutation();
  const [editingId, setEditingId] = useState<string | null>(null);
  const { data: editingPermission } = useGetPermissionQuery(editingId!, {
    skip: !editingId,
  });

  const {
    data: permissions = [],
    isFetching: permissionsFetching,
    isLoading: permissionsLoading,
  } = useGetPermissionsQuery();
  const mode: FormMode = editingId ? 'update' : 'create';

  const handleSubmit = async (data: PermissionFormValues) => {
    if (editingId) {
      await updatePermission({
        id: editingId,
        ...data,
      }).unwrap();
      setEditingId(null);
      appToast.success(NOTIFICATIONS.updated);
      return;
    }
    await createPermission(data).unwrap();
    appToast.success(NOTIFICATIONS.created);
  };

  const handleDeletePermission = async (id: string) => {
    console.log('test delete', id);
  };

  const handleGetPermission = (id: string) => {
    if (!id) return;
    setEditingId(id);
  };
  const handleResetId = () => {
    setEditingId(null);
  };

  return {
    mode,
    permissions,
    editingPermission,
    permissionsFetching,
    permissionsLoading,
    onSave: handleSubmit,
    onEdit: handleGetPermission,
    onDelete: handleDeletePermission,
    resetId: handleResetId,
  };
};
