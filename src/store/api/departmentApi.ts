import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../baseQueryWithReauth";

export const departmentApi = createApi({
  reducerPath: "departmentApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: [],
  endpoints: (build) => ({
    getDepartments: build.query({
      query: () => ({
        url: ``,
      }),
    }),
    getDepartment: build.query({
      query: () => ({
        url: ``,
      }),
    }),
    createDepartment: build.mutation({
      query: (body) => ({
        url: ``,
        method: "POST",
        body,
      }),
    }),
    updateDepartment: build.mutation({
      query: (body) => ({
        url: ``,
        method: "PATCH",
        body,
      }),
    }),
    deleteDepartment: build.query({
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
