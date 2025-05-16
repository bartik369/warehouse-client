import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../baseQueryWithReauth';
import { IEntity } from '../../types/devices';

export const typesApi = createApi({
  reducerPath: 'typesApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Type'],
  endpoints: (build) => ({
    getTypes: build.query<IEntity[], void>({
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
    getType: build.query<IEntity, string>({
        query: (id: string) => ({
            url: `${import.meta.env.VITE_TYPES}${id}`,
        }),
    }),
    createType: build.mutation<IEntity, IEntity>({
        query:(body) => ({
            url: `${import.meta.env.VITE_TYPES}`,
            method: 'POST',
            body,
        }),
        invalidatesTags: ['Type']
    }),
    updateType: build.mutation<IEntity, IEntity>({
        query: ({id, ...body}) => ({
          url: `${import.meta.env.VITE_TYPES}${id}`,
          method: 'PUT',
          body,
        }),
        invalidatesTags: ['Type']
    })
  }),
});

export const { 
    useGetTypesQuery, 
    useLazyGetTypeQuery, 
    useCreateTypeMutation, 
    useUpdateTypeMutation 
} = typesApi;
