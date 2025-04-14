import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../baseQueryWithReauth";
import { IEntity } from "../../types/devices";
import { IRole } from "../../types/access";

export const permissionApi = createApi({
  reducerPath: "permissionApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Role'],
  endpoints: (build) => ({
    getRoles: build.query<IEntity[], void>({
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
    getRole: build.query({
      query: (id: string) => ({
        url: `${import.meta.env.VITE_ROLES}${id}`,
      })
    }),
    createRole: build.mutation({
      query: (body) => ({
        url: `${import.meta.env.VITE_ROLES}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ['Role']
    }),
    updateRole: build.mutation<IRole, {id: string, body: FormData}>({
      query: ({ id, ...body }) => ({
        url: `${import.meta.env.VITE_ROLES}${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ['Role']
    }),
    createPermission: build.mutation({
      query: (body) => ({
        url: ``,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetRolesQuery,
  useLazyGetRoleQuery,
  useUpdateRoleMutation,
  useCreateRoleMutation, 
  useCreatePermissionMutation,
 } =
  permissionApi;
