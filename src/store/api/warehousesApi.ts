import { createApi } from '@reduxjs/toolkit/query/react';

import { Warehouse } from '@/entities/warehouse/model/types';

import { baseQueryWithReauth } from '../baseQueryWithReauth';

export const warehousesApi = createApi({
  reducerPath: 'warehousesApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Warehouse'],
  endpoints: (build) => ({
    getWarehouses: build.query<Warehouse[], void>({
      query: () => ({
        url: `${import.meta.env.VITE_WAREHOUSES}`,
        method: 'GET',
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Warehouse' as const, id })),
              { type: 'Warehouse', id: 'LIST' },
            ]
          : [{ type: 'Warehouse', id: 'LIST' }],
    }),
    getWarehouse: build.query<Warehouse, string>({
      query: (id: string) => ({
        url: `${import.meta.env.VITE_WAREHOUSES}${id}`,
      }),
      providesTags: (_result, _error, id) => [
        {
          type: 'Warehouse',
          id,
        },
      ],
    }),
    getAssignableWarehouses: build.query<Warehouse[], string>({
      query: (locationId) => ({
        url: `${import.meta.env.VITE_ASSIGNABLE_WAREHOUSES}${locationId}`,
      }),
    }),
    createWarehouse: build.mutation<Warehouse, Omit<Warehouse, 'id'>>({
      query: (body) => ({
        url: `${import.meta.env.VITE_WAREHOUSES}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [
        {
          type: 'Warehouse',
          id: 'LIST',
        },
      ],
    }),
    updateWarehouse: build.mutation<Warehouse, Warehouse>({
      query: ({ id, ...body }) => ({
        url: `${import.meta.env.VITE_WAREHOUSES}${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        {
          type: 'Warehouse',
          id,
        },
        {
          type: 'Warehouse',
          id: 'LIST',
        },
      ],
    }),
    getWarehousesByUser: build.query<Warehouse[], string>({
      query: (id: string) => ({
        url: `${import.meta.env.VITE_WAREHOUSES_BY_USER}${id}`,
      }),
    }),
  }),
});

export const {
  useGetWarehousesQuery,
  useCreateWarehouseMutation,
  useGetWarehouseQuery,
  useUpdateWarehouseMutation,
  useLazyGetAssignableWarehousesQuery,
  useLazyGetWarehousesByUserQuery,
} = warehousesApi;
