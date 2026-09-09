import { createApi } from '@reduxjs/toolkit/query/react';

import { DeviceType } from '@/entities/type/model/types';
import { Entity } from '@/types/devices';

import { baseQueryWithReauth } from '../baseQueryWithReauth';

export const typesApi = createApi({
  reducerPath: 'typesApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Type'],
  endpoints: (build) => ({
    getTypes: build.query<DeviceType[], void>({
      query: () => ({
        url: `${import.meta.env.VITE_TYPES}`,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Type' as const, id })),
              { type: 'Type', id: 'LIST' },
            ]
          : [{ type: 'Type', id: 'LIST' }],
    }),
    getType: build.query<DeviceType, string>({
      query: (id: string) => ({
        url: `${import.meta.env.VITE_TYPES}${id}`,
      }),
    }),
    createType: build.mutation<DeviceType, DeviceType>({
      query: (body) => ({
        url: `${import.meta.env.VITE_TYPES}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Type'],
    }),
    updateType: build.mutation<DeviceType, DeviceType>({
      query: ({ id, ...body }) => ({
        url: `${import.meta.env.VITE_TYPES}${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Type'],
    }),
  }),
});

export const {
  useGetTypesQuery,
  useLazyGetTypeQuery,
  useCreateTypeMutation,
  useUpdateTypeMutation,
} = typesApi;
