import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../baseQueryWithReauth';
import { IAdminEntity } from '../../types/content';

export const warehousesApi = createApi({
  reducerPath: 'warehousesApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Warehouse'],
  endpoints: (build) => ({
    getWarehouses: build.query<IAdminEntity[], void>({
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
    getWarehouse: build.query<IAdminEntity, string>({
      query: (id:string) => ({
        url: `${import.meta.env.VITE_WAREHOUSES}${id}`,
      })
    }),
    createWarehouse: build.mutation({
      query: (body) => ({
        url: `${import.meta.env.VITE_WAREHOUSES}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Warehouse'],
    }),
    updateWarehouse: build.mutation({
      query: ({id, ...body}) => ({
        url: `${import.meta.env.VITE_WAREHOUSES}${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Warehouse'],
    }),
  }),
});

export const { 
  useGetWarehousesQuery, 
  useCreateWarehouseMutation,
  useLazyGetWarehouseQuery,
  useUpdateWarehouseMutation,
 } =
  warehousesApi;
