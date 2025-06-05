import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../baseQueryWithReauth";
import { IRole } from "../../types/access";
import { IEntity } from "../../types/devices";

export const rolesApi = createApi({
  reducerPath: "rolesApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Role"],
  endpoints: (build) => ({
    getRoles: build.query<IRole[], void>({
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
    getRole: build.query<IRole, string>({
      query: (id: string) => ({
        url: `${import.meta.env.VITE_ROLES}${id}`,
      }),
    }),
    getAssignableRoles: build.query<IRole, void>({
      query: () => ({
        url: `${import.meta.env.VITE_ASSIGNABLE_ROLES}`,
      }),
    }),
    createRole: build.mutation<IRole, IEntity>({
      query: (body) => ({
        url: `${import.meta.env.VITE_ROLES}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Role"],
    }),
    updateRole: build.mutation<IRole, { id: string } & Partial<IRole>>({
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
    // grantRole: build.mutation({
    //   query: () => ({

    //   })
    // })
  }),
});

export const {
  useGetRolesQuery,
  useLazyGetRoleQuery,
  useGetAssignableRolesQuery,
  useUpdateRoleMutation,
  useCreateRoleMutation,
  useDeleteRoleMutation,
} = rolesApi;
