import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../baseQueryWithReauth";
import { Entity } from "@/types/devices";
import { Warehouse } from "@/types/locations";

export const warehousesApi = createApi({
  reducerPath: "warehousesApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Warehouse"],
  endpoints: (build) => ({
    getWarehouses: build.query<Entity[], void>({
      query: () => ({
        url: `${import.meta.env.VITE_WAREHOUSES}`,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Warehouse" as const, id })),
              { type: "Warehouse", id: "LIST" },
            ]
          : [{ type: "Warehouse", id: "LIST" }],
    }),
    getWarehouse: build.query<Entity, string>({
      query: (id: string) => ({
        url: `${import.meta.env.VITE_WAREHOUSES}${id}`,
      }),
    }),
    getAssignableWarehouses: build.query<Entity[], string>({
      query: (locationId) => ({
        url: `${import.meta.env.VITE_ASSIGNABLE_WAREHOUSES}${locationId}`,
      }),
    }),
    createWarehouse: build.mutation<{ message: string, warehouse: Entity }, Entity>({
      query: (body) => ({
        url: `${import.meta.env.VITE_WAREHOUSES}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Warehouse"],
    }),
    updateWarehouse: build.mutation<{ message: string, updatedWarehouse: Entity }, Entity>({
      query: ({ id, ...body }) => ({
        url: `${import.meta.env.VITE_WAREHOUSES}${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Warehouse"],
    }),
    getWarehousesByUser: build.query<Warehouse[], string>({
      query: (id: string) => ({
        url: `${import.meta.env.VITE_WAREHOUSES_BY_USER}${id}`,
      })
    })
  }),
});

export const {
  useGetWarehousesQuery,
  useCreateWarehouseMutation,
  useLazyGetWarehouseQuery,
  useUpdateWarehouseMutation,
  useLazyGetAssignableWarehousesQuery,
  useLazyGetWarehousesByUserQuery,
} = warehousesApi;
