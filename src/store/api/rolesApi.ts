import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../baseQueryWithReauth";
import { Role, RoleList, UserRolesResponse } from "../../types/access";
import { Entity } from "../../types/devices";

export const rolesApi = createApi({
  reducerPath: "rolesApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Role"],
  endpoints: (build) => ({
    getRoles: build.query<Role[], void>({
      query: () => ({
        url: `${import.meta.env.VITE_ROLES}`,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Role" as const, id })),
              { type: "Role", id: "LIST" },
            ]
          : [{ type: "Role", id: "LIST" }],
    }),
    getRole: build.query<Role, string>({
      query: (id: string) => ({
        url: `${import.meta.env.VITE_ROLES}${id}`,
      }),
    }),
    getRolesList: build.query<RoleList[], void>({
      query: () => ({
        url: `${import.meta.env.VITE_LIST_ROLES}`
      })
    }),
    getUserRoles: build.query<UserRolesResponse, string>({
      query: (id: string) => ({
         url: `${import.meta.env.VITE_USER_ROLES}${id}`
      })
    }),
    getAssignableRoles: build.query<Role, void>({
      query: () => ({
        url: `${import.meta.env.VITE_ASSIGNABLE_ROLES}`,
      }),
    }),
    createRole: build.mutation<Role, Entity>({
      query: (body) => ({
        url: `${import.meta.env.VITE_ROLES}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Role"],
    }),
    updateRole: build.mutation<Role, { id: string } & Partial<Role>>({
      query: ({ id, ...body }) => ({
        url: `${import.meta.env.VITE_ROLES}${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Role"],
    }),
    deleteRole: build.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `${import.meta.env.VITE_ROLES}${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Role"],
    }),
    grantRole: build.mutation({
      query: (body) => ({
        url: `${import.meta.env.VITE_GRANT_ROLES}`,
        method: 'POST',
        body,
      })
    })
  }),
});

export const {
  useGetRolesQuery,
  useLazyGetRoleQuery,
  useGetAssignableRolesQuery,
  useUpdateRoleMutation,
  useCreateRoleMutation,
  useDeleteRoleMutation,
  useGrantRoleMutation,
  useGetRolesListQuery,
  useLazyGetUserRolesQuery,
} = rolesApi;
