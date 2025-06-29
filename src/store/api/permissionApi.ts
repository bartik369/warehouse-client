import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../baseQueryWithReauth";
import { Permission, PermissionRole, UserRolesList } from "@/types/access";
import { Entity } from "@/types/devices";
import { CheckedPermissionOptions } from '@/types/content';

export const permissionApi = createApi({
  reducerPath: "permissionApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Permission", "PermissionRole"],
  endpoints: (build) => ({
    getPermissions: build.query<CheckedPermissionOptions[], void>({
      query: () => ({
        url: `${import.meta.env.VITE_PERMISSIONS}`,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Permission" as const, id })),
              { type: "Permission", id: "LIST" },
            ]
          : [{ type: "Permission", id: "LIST" }],
    }),
    getPermission: build.query<Permission, string>({
      query: (id: string) => ({
        url: `${import.meta.env.VITE_PERMISSIONS}${id}`,
      }),
    }),

    createPermission: build.mutation<CheckedPermissionOptions, Entity>({
      query: (body) => ({
        url: `${import.meta.env.VITE_PERMISSIONS}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Permission"],
    }),
    updatePermission: build.mutation<Permission, Entity>({
      query: ({ id, ...body }) => ({
        url: `${import.meta.env.VITE_PERMISSIONS}${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Permission"],
    }),
    deletePermission: build.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `${import.meta.env.VITE_PERMISSIONS}${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Permission"],
    }),
    getPermissionsRoles: build.query<UserRolesList[], void>({
      query: () => ({
        url: `${import.meta.env.VITE_PERMISSIONS_ROLES}`,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ roleName, warehouseName, locationName }) => ({
                type: "PermissionRole" as const,
                id: `${roleName}_${locationName}_${warehouseName || 'null'}`,
              })),
              { type: "PermissionRole", id: "LIST" },
            ]
          : [{ type: "PermissionRole", id: "LIST" }],
    }),
    createPermissionRole: build.mutation<PermissionRole, PermissionRole>({
      query: (body) => ({
        url: `${import.meta.env.VITE_PERMISSIONS_ROLES}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["PermissionRole"],
    }),
    updatePermissionRole: build.mutation({
      query: (body) => ({
        url: `${import.meta.env.VITE_PERMISSIONS_ROLES}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["PermissionRole"],
    }),
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
