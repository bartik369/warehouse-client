import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../baseQueryWithReauth";
import { ILocation } from "../../types/locations";

export const departmentApi = createApi({
  reducerPath: "departmentApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Department"],
  endpoints: (build) => ({
    getDepartments: build.query<ILocation[], void>({
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
    getDepartment: build.query({
      query: () => ({
        url: ``,
      }),
    }),
    createDepartment: build.mutation({
      query: (body) => ({
        url: `${import.meta.env.VITE_DEPARTMENTS}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ['Department'],
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
