import { useMemo, useState } from 'react';

import { PermissionRole } from '@/entities/permission-role/model/types';
import { appToast } from '@/shared/lib/toast/toast';
import { FormMode } from '@/shared/types/form';
import { useGetLocationsQuery } from '@/store/api/locationApi';
import {
  useCreatePermissionRoleMutation,
  useGetPermissionsQuery,
  useGetPermissionsRolesQuery,
  useUpdatePermissionRoleMutation,
} from '@/store/api/permissionApi';
import { useGetRolesQuery } from '@/store/api/rolesApi';
import { useGetWarehousesQuery } from '@/store/api/warehousesApi';

import { NOTIFICATIONS } from './constants';
import { PermissionRoleFormValues } from './schema';

export const useManagePermissionRole = () => {
  const [selectedPermissionRoles, setSelectedPermissionRoles] = useState<PermissionRole | null>(
    null
  );
  const { data: roles = [] } = useGetRolesQuery();
  const { data: locations = [] } = useGetLocationsQuery();
  const { data: permissions = [] } = useGetPermissionsQuery();
  const { data: warehouses = [] } = useGetWarehousesQuery();
  const {
    data: permissionRoles = [],
    isFetching: permissionRolesFetching,
    isLoading: permissionRolesLoading,
  } = useGetPermissionsRolesQuery();
  const [createPermissionRole] = useCreatePermissionRoleMutation();
  const [updatePermissionRole] = useUpdatePermissionRoleMutation();

  const mode: FormMode = selectedPermissionRoles ? 'update' : 'create';

  // todo  продуматб логику
  const handleSubmit = async (data: PermissionRoleFormValues) => {
    if (selectedPermissionRoles) {
      await updatePermissionRole(data).unwrap();
      setSelectedPermissionRoles(null);
      appToast.success(NOTIFICATIONS.updated);
      return;
    }
    await createPermissionRole(data).unwrap();
    appToast.success(NOTIFICATIONS.created);
  };

  const handleDeletePermissionRole = async (id: string) => {
    console.log('test delete', id);
  };

  const handleGetPermissionRole = (role: PermissionRole) => {
    if (!role) return;
    setSelectedPermissionRoles(role);
  };
  const handleResetPermissionRoles = () => {
    setSelectedPermissionRoles(null);
  };

  const warehouseOptions = useMemo(() => {
    return warehouses.map((item) => ({
      value: item.id,
      label: item.name,
    }));
  }, [warehouses]);

  const roleOptions = useMemo(() => {
    return roles.map((item) => ({
      value: item.id,
      label: item.name,
    }));
  }, [roles]);

  const locationOptions = useMemo(() => {
    return locations.map((item) => ({
      value: item.id,
      label: item.name,
    }));
  }, [locations]);

  const permissionOptions = useMemo(() => {
    return permissions.map((item) => ({
      value: item.id,
      label: item.name,
    }));
  }, [permissions]);

  return {
    mode,
    roles,
    locations,
    warehouseOptions,
    selectedPermissionRoles,
    roleOptions,
    locationOptions,
    permissionOptions,
    permissions,
    permissionRoles,
    permissionRolesFetching,
    permissionRolesLoading,
    onSave: handleSubmit,
    onEdit: handleGetPermissionRole,
    onDelete: handleDeletePermissionRole,
    resetId: handleResetPermissionRoles,
  };
};
