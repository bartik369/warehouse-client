import { createApi } from '@reduxjs/toolkit/query/react';

import { Manufacturer } from '@/entities/manufacturer/model/type';

import { baseQueryWithReauth } from '../baseQueryWithReauth';

export const manufacturersApi = createApi({
  reducerPath: 'manufacturersApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Manufacturer'],
  endpoints: (build) => ({
    getManufacturer: build.query({
      query: (id: string) => ({
        url: `${import.meta.env.VITE_MANUFACTURERS}${id}`,
      }),
    }),
    getManufacturers: build.query<Manufacturer[], void>({
      query() {
        return {
          url: `${import.meta.env.VITE_MANUFACTURERS}`,
          refetchOnMountOrArgChange: true,
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: 'Manufacturer' as const,
                id,
              })),
              { type: 'Manufacturer', id: 'LIST' },
            ]
          : [{ type: 'Manufacturer', id: 'LIST' }],
    }),
    createManufacturer: build.mutation<Manufacturer, Omit<Manufacturer, 'id'>>({
      query(body) {
        return {
          url: `${import.meta.env.VITE_MANUFACTURERS}`,
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['Manufacturer'],
    }),
    updateManufacturer: build.mutation<Manufacturer, Manufacturer>({
      query: ({ id, ...body }) => ({
        url: `${import.meta.env.VITE_MANUFACTURERS}${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Manufacturer'],
    }),
  }),
});

export const {
  useGetManufacturersQuery,
  useCreateManufacturerMutation,
  useUpdateManufacturerMutation,
  useGetManufacturerQuery,
} = manufacturersApi;
