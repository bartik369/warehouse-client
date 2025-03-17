import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../baseQueryWithReauth";
import { ILocation } from "../../types/locations";

export const warehousesApi = createApi({
  reducerPath: "warehousesApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Warehouse"],
  endpoints: (build) => ({
    getWarehouses: build.query<ILocation[], void>({
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
    createWarehouse: build.mutation({
      query: (body) => ({
        url: `${import.meta.env.VITE_WAREHOUSES}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Warehouse"],
    }),
  }),
});

export const { useGetWarehousesQuery, useCreateWarehouseMutation } =
  warehousesApi;
