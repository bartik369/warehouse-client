import { createApi } from '@reduxjs/toolkit/query/react';

import { GrantUserRole, Role, RoleList, UserRolesResponse } from '@/entities/role/model/types';

import { baseQueryWithReauth } from '../baseQueryWithReauth';

export const rolesApi = createApi({
  reducerPath: 'rolesApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Role', 'UserRoles'],
  endpoints: (build) => ({
    getRoles: build.query<Role[], void>({
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
    getRole: build.query<Role, string>({
      query: (id: string) => ({
        url: `${import.meta.env.VITE_ROLES}${id}`,
      }),
      providesTags: (_result, _error, id) => [
        {
          type: 'Role',
          id,
        },
      ],
    }),
    getRolesList: build.query<RoleList[], void>({
      query: () => ({
        url: `${import.meta.env.VITE_LIST_ROLES}`,
      }),
    }),
    getUserRoles: build.query<UserRolesResponse, string>({
      query: (id: string) => ({
        url: `${import.meta.env.VITE_USER_ROLES}${id}`,
      }),
      providesTags: (_result, _error, userId) => [
        {
          type: 'UserRoles',
          id: userId,
        },
      ],
    }),
    getAssignableRoles: build.query<Role, void>({
      query: () => ({
        url: `${import.meta.env.VITE_ASSIGNABLE_ROLES}`,
      }),
    }),
    createRole: build.mutation<Role, Omit<Role, 'id'>>({
      query: (body) => ({
        url: `${import.meta.env.VITE_ROLES}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [
        {
          type: 'Role',
          id: 'LIST',
        },
      ],
    }),
    updateRole: build.mutation<Role, Role>({
      query: ({ id, ...body }) => ({
        url: `${import.meta.env.VITE_ROLES}${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        {
          type: 'Role',
          id,
        },
        {
          type: 'Role',
          id: 'LIST',
        },
      ],
    }),
    deleteRole: build.mutation<string, string>({
      query: (id) => ({
        url: `${import.meta.env.VITE_ROLES}${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Role'],
    }),
    grantRole: build.mutation<unknown, GrantUserRole>({
      query: (body) => ({
        url: `${import.meta.env.VITE_GRANT_ROLES}`,
        method: 'POST',
        body,
      }),

      invalidatesTags: (_result, error, { userId }) =>
        error
          ? []
          : [
              {
                type: 'UserRoles',
                id: userId,
              },
            ],
    }),
    revokeRole: build.mutation<unknown, { assignmentId: string; userId?: string }>({
      query: ({ assignmentId }) => ({
        url: `${import.meta.env.VITE_USER_ROLES}${assignmentId}`,
        method: 'DELETE',
      }),

      invalidatesTags: (_result, error, { userId }) =>
        error
          ? []
          : [
              {
                type: 'UserRoles',
                id: userId,
              },
            ],
    }),
  }),
});

export const {
  useGetRolesQuery,
  useGetRoleQuery,
  useGetAssignableRolesQuery,
  useUpdateRoleMutation,
  useRevokeRoleMutation,
  useCreateRoleMutation,
  useDeleteRoleMutation,
  useGrantRoleMutation,
  useGetRolesListQuery,
  useGetUserRolesQuery,
} = rolesApi;
