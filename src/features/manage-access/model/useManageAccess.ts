import { useMemo } from 'react';

import { useGetPermissionsRolesQuery } from '@/store/api/permissionApi';

import { AccessFromValues } from './schema';

export const useManageAccess = () => {
  const { data: permissionRoles = [] } = useGetPermissionsRolesQuery();

  const handleSubmit = async (data: AccessFromValues) => {
    // if (editingId) {
    //   await updateContractor({
    //     id: editingId,
    //     ...data,
    //   }).unwrap();
    //   setEditingId(null);
    //   appToast.success(NOTIFICATIONS.updated);
    //   return;
    // }
    // await createContractor(data).unwrap();
    // appToast.success(NOTIFICATIONS.created);
  };

  return {
    roles: permissionRoles,
    onSave: handleSubmit,
  };
};
