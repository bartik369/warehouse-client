import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../baseQueryWithReauth";
import { IEntity } from "../../types/devices";

export const warehousesApi = createApi({
  reducerPath: "warehousesApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Warehouse"],
  endpoints: (build) => ({
    getWarehouses: build.query<IEntity[], void>({
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
    getWarehouse: build.query<IEntity, string>({
      query: (id: string) => ({
        url: `${import.meta.env.VITE_WAREHOUSES}${id}`,
      }),
    }),
    getAssignableWarehouses: build.query<IEntity[], string>({
      query: (locationId) => ({
        url: `${import.meta.env.VITE_ASSIGNABLE_WAREHOUSES}${locationId}`,
      }),
    }),
    createWarehouse: build.mutation<{ message: string, warehouse: IEntity }, IEntity>({
      query: (body) => ({
        url: `${import.meta.env.VITE_WAREHOUSES}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Warehouse"],
    }),
    updateWarehouse: build.mutation<{ message: string, updatedWarehouse: IEntity }, IEntity>({
      query: ({ id, ...body }) => ({
        url: `${import.meta.env.VITE_WAREHOUSES}${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Warehouse"],
    }),
  }),
});

export const {
  useGetWarehousesQuery,
  useCreateWarehouseMutation,
  useLazyGetWarehouseQuery,
  useUpdateWarehouseMutation,
  useLazyGetAssignableWarehousesQuery,
} = warehousesApi;
