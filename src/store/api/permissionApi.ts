import { location } from './../../utils/constants/device';
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../baseQueryWithReauth";
import { IRole, IPermission } from "../../types/access";
import { IEntity } from "../../types/devices";
import { CheckedPermissionOptions } from '../../types/content';

export const permissionApi = createApi({
  reducerPath: "permissionApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Role', 'Permission'],
  endpoints: (build) => ({
    getRoles: build.query<IRole[], void>({
      query: () => ({
        url: `${import.meta.env.VITE_ROLES}`,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Role' as const, id })),
              { type: 'Role', id: 'LIST' },
            ]
          : [{ type: 'Role', id: 'LIST' }],
    }),
    getRole: build.query<IRole, string>({
      query: (id: string) => ({
        url: `${import.meta.env.VITE_ROLES}${id}`,
      })
    }),
    getAssignableRoles: build.query<IRole, void>({
      query: () => ({
        url: `${import.meta.env.VITE_ASSIGNABLE_ROLES}`,
      })
    }),
    createRole: build.mutation<IRole, IEntity>({
      query: (body) => ({
        url: `${import.meta.env.VITE_ROLES}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ['Role']
    }),
    updateRole: build.mutation<IRole, {id: string, body: IEntity}>({
      query: ({ id, ...body }) => ({
        url: `${import.meta.env.VITE_ROLES}${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ['Role']
    }),
    deleteRole: build.mutation<null, string>({
      query: (id) => ({
        url: `${import.meta.env.VITE_ROLES}${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['Role']
    }),
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
    getPermission: build.query<IPermission, string>({
      query: (id: string) => ({
        url: `${import.meta.env.VITE_PERMISSIONS}${id}`,
      }),
    }),

    createPermission: build.mutation<CheckedPermissionOptions, IEntity>({
      query: (body) => ({
        url: `${import.meta.env.VITE_PERMISSIONS}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ['Permission']
    }),
    updatePermission: build.mutation<IPermission, IEntity>({
      query: ({ id, ...body }) => ({
        url: `${import.meta.env.VITE_PERMISSIONS}${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ['Permission']
    }),
    deletePermission: build.mutation<null, string>({
      query: (id) => ({
        url: `${import.meta.env.VITE_PERMISSIONS}${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['Permission']
    }),
  }),
});

export const {
  useGetRolesQuery,
  useLazyGetRoleQuery,
  useGetAssignableRolesQuery,
  useUpdateRoleMutation,
  useCreateRoleMutation, 
  useDeleteRoleMutation,
  useGetPermissionsQuery,
  useLazyGetPermissionQuery,
  useCreatePermissionMutation,
  useUpdatePermissionMutation,
  useDeletePermissionMutation,
 } =
  permissionApi;
