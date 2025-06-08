import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../baseQueryWithReauth";
import { IPermission, IPermissionRole, IUserRolesList } from "../../types/access";
import { IEntity } from "../../types/devices";
import { CheckedPermissionOptions } from '../../types/content';

export const permissionApi = createApi({
  reducerPath: "permissionApi",
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
    deletePermission: build.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `${import.meta.env.VITE_PERMISSIONS}${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['Permission']
    }),
    getPermissionsRoles: build.query<IUserRolesList[], void>({
      query: () => ({
        url: `${import.meta.env.VITE_PERMISSIONS_ROLES}`,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'PermissionRole' as const, id })),
              { type: 'PermissionRole', id: 'LIST' },
            ]
          : [{ type: 'PermissionRole', id: 'LIST' }],
    }),
    createPermissionRole: build.mutation<IPermissionRole, IPermissionRole>({
      query: (body) => ({
        url: `${import.meta.env.VITE_PERMISSIONS_ROLES}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['PermissionRole']
    }),
    updatePermissionRole: build.mutation({
      query: (body) => ({
        url: `${import.meta.env.VITE_PERMISSIONS_ROLES}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['PermissionRole']
    })
  }),
});

export const {
  useGetPermissionsQuery,
  useLazyGetPermissionQuery,
  useCreatePermissionMutation,
  useUpdatePermissionMutation,
  useDeletePermissionMutation,
  useCreatePermissionRoleMutation,
  useUpdatePermissionRoleMutation,
  useGetPermissionsRolesQuery,
 } =
  permissionApi;
