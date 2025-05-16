import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../baseQueryWithReauth';
import { IEntity } from '../../types/devices';

export const departmentApi = createApi({
  reducerPath: "departmentApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Department"],
  endpoints: (build) => ({
    getDepartments: build.query<IEntity[], void>({
      query: () => ({
        url: `${import.meta.env.VITE_DEPARTMENTS}`,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Department" as const, id })),
              { type: "Department", id: "LIST" },
            ]
          : [{ type: "Department", id: "LIST" }],
    }),
    getDepartment: build.query<IEntity, string>({
      query: (id: string) => ({
        url: `${import.meta.env.VITE_DEPARTMENTS}${id}`,
      }),
    }),
    createDepartment: build.mutation<
      { message: string; department: IEntity },
      IEntity
    >({
      query: (body) => ({
        url: `${import.meta.env.VITE_DEPARTMENTS}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Department"],
    }),
    updateDepartment: build.mutation<
      { message: string; updatedDepartment: IEntity },
      { id: string } & Partial<IEntity>
    >({
      query: ({ id, ...body }) => ({
        url: `${import.meta.env.VITE_DEPARTMENTS}${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Department"],
    }),
    deleteDepartment: build.query<{ message: string }, string>({
      query: () => ({
        url: ``,
      }),
    }),
  }),
});

export const {
  useLazyGetDepartmentQuery,
  useGetDepartmentsQuery,
  useCreateDepartmentMutation,
  useUpdateDepartmentMutation,
  useDeleteDepartmentQuery,
} = departmentApi;
