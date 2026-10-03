import { createApi } from '@reduxjs/toolkit/query/react';

import { PermissionRole, SortedRolePermissionsRes } from '@/entities/permission-role/model/types';
import { Permission } from '@/entities/permission/model/types';
import { RolePermissionsQueryParams } from '@/shared/types/api';
import { CheckedPermissionOptions } from '@/types/content';

import { baseQueryWithReauth } from '../baseQueryWithReauth';

export const permissionApi = createApi({
  reducerPath: 'permissionApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Permission', 'PermissionRole'],
  endpoints: (build) => ({
    getPermissions: build.query<CheckedPermissionOptions[], void>({
      query: () => ({
        url: `${import.meta.env.VITE_PERMISSIONS}`,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Permission' as const, id })),
              { type: 'Permission', id: 'LIST' },
            ]
          : [{ type: 'Permission', id: 'LIST' }],
    }),
    getPermission: build.query<Permission, string>({
      query: (id: string) => ({
        url: `${import.meta.env.VITE_PERMISSIONS}${id}`,
      }),
      providesTags: (_result, _error, id) => [
        {
          type: 'Permission',
          id,
        },
      ],
    }),

    createPermission: build.mutation<Permission, Omit<Permission, 'id'>>({
      query: (body) => ({
        url: `${import.meta.env.VITE_PERMISSIONS}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [
        {
          type: 'Permission',
          id: 'LIST',
        },
      ],
    }),
    updatePermission: build.mutation<Permission, Permission>({
      query: ({ id, ...body }) => ({
        url: `${import.meta.env.VITE_PERMISSIONS}${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        {
          type: 'Permission',
          id,
        },
        {
          type: 'Permission',
          id: 'LIST',
        },
      ],
    }),
    deletePermission: build.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `${import.meta.env.VITE_PERMISSIONS}${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Permission'],
    }),
    getRolesPermissionsOptions: build.query<PermissionRole[], void>({
      query: () => ({
        url: `${import.meta.env.VITE_PERMISSIONS_ROLES_OPTIONS}`,
      }),
      providesTags: [{ type: 'PermissionRole', id: 'LIST' }],
    }),
    getPermissionsRoles: build.query<SortedRolePermissionsRes, RolePermissionsQueryParams>({
      query: (queryParams) => {
        const { ...params } = queryParams;
        const urlParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
          if (value == null) return;
          urlParams.append(key, String(value));
        });
        return {
          url: `${import.meta.env.VITE_PERMISSIONS_ROLES}?${urlParams}`,
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.items.map(({ roleName, warehouseName, locationName }) => ({
                type: 'PermissionRole' as const,
                id: `${roleName}_${locationName}_${warehouseName || 'null'}`,
              })),
              { type: 'PermissionRole', id: 'LIST' },
            ]
          : [{ type: 'PermissionRole', id: 'LIST' }],
    }),
    createPermissionRole: build.mutation<PermissionRole, Omit<PermissionRole, 'id'>>({
      query: (body) => ({
        url: `${import.meta.env.VITE_PERMISSIONS_ROLES}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['PermissionRole'],
    }),
    updatePermissionRole: build.mutation({
      query: (body) => ({
        url: `${import.meta.env.VITE_PERMISSIONS_ROLES}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['PermissionRole'],
    }),
  }),
});

export const {
  useGetPermissionsQuery,
  useGetPermissionQuery,
  useCreatePermissionMutation,
  useUpdatePermissionMutation,
  useDeletePermissionMutation,
  useCreatePermissionRoleMutation,
  useUpdatePermissionRoleMutation,
  useGetPermissionsRolesQuery,
  useGetRolesPermissionsOptionsQuery,
} = permissionApi;
