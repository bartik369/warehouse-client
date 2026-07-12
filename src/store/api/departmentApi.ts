import { createApi } from '@reduxjs/toolkit/query/react';

import { Department } from '@/entities/department/model/type';

import { baseQueryWithReauth } from '../baseQueryWithReauth';

export const departmentApi = createApi({
  reducerPath: 'departmentApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Department'],
  endpoints: (build) => ({
    getDepartments: build.query<Department[], void>({
      query: () => ({
        url: `${import.meta.env.VITE_DEPARTMENTS}`,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Department' as const, id })),
              { type: 'Department', id: 'LIST' },
            ]
          : [{ type: 'Department', id: 'LIST' }],
    }),
    getDepartment: build.query<Department, string>({
      query: (id: string) => ({
        url: `${import.meta.env.VITE_DEPARTMENTS}${id}`,
      }),
      providesTags: (_result, _error, id) => [
        {
          type: 'Department',
          id,
        },
      ],
    }),
    createDepartment: build.mutation<Department, Omit<Department, 'id'>>({
      query: (body) => ({
        url: `${import.meta.env.VITE_DEPARTMENTS}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [
        {
          type: 'Department',
          id: 'LIST',
        },
      ],
    }),
    updateDepartment: build.mutation<Department, Department>({
      query: ({ id, ...body }) => ({
        url: `${import.meta.env.VITE_DEPARTMENTS}${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        {
          type: 'Department',
          id,
        },
        {
          type: 'Department',
          id: 'LIST',
        },
      ],
    }),
    deleteDepartment: build.query<{ message: string }, string>({
      query: () => ({
        url: ``,
      }),
    }),
  }),
});

export const {
  useGetDepartmentQuery,
  useGetDepartmentsQuery,
  useCreateDepartmentMutation,
  useUpdateDepartmentMutation,
  useDeleteDepartmentQuery,
} = departmentApi;
