import { createApi } from '@reduxjs/toolkit/query/react';

import { Model } from '@/entities/model/model/types';

import { baseQueryWithReauth } from '../baseQueryWithReauth';

export const modelsApi = createApi({
  reducerPath: 'modelsApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Model'],
  endpoints: (build) => ({
    getModels: build.query<Model[], { manufacturerId: string; typeId: string }>({
      query({ manufacturerId, typeId }) {
        return {
          url: `${import.meta.env.VITE_MODELS_UNITED}${manufacturerId}/${typeId}`,
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Model' as const, id })),
              { type: 'Model', id: 'LIST' },
            ]
          : [{ type: 'Model', id: 'LIST' }],
    }),
    getAllModels: build.query<Model[], void>({
      query: () => ({
        url: `${import.meta.env.VITE_MODELS_ALL}`,
      }),
    }),
    getModel: build.query<Model, string>({
      query: (id: string) => ({
        url: `${import.meta.env.VITE_MODEL}${id}`,
      }),
    }),
    createModel: build.mutation<Model, FormData>({
      query: (body) => ({
        url: `${import.meta.env.VITE_MODELS}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Model'],
    }),
    updateModel: build.mutation<Model, FormData>({
      query: (body) => {
        const id = body.get('id') as string;
        if (!id) throw new Error('Something went wrong');
        return {
          url: `${import.meta.env.VITE_MODELS}${id}`,
          method: 'PUT',
          body: body,
        };
      },
      invalidatesTags: ['Model'],
    }),
  }),
});

export const {
  useLazyGetModelsQuery,
  useGetModelsQuery,
  useLazyGetModelQuery,
  useCreateModelMutation,
  useUpdateModelMutation,
  useGetAllModelsQuery,
} = modelsApi;
