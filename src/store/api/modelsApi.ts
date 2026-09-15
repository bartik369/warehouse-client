import { createApi } from '@reduxjs/toolkit/query/react';

import { DeviceModelResponse, Model } from '@/entities/model/model/types';

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
    getAllModels: build.query<DeviceModelResponse[], void>({
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
    updateModel: build.mutation<Model, { id: string; body: FormData }>({
      query: ({ id, body }) => {
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
  useGetModelQuery,
  useCreateModelMutation,
  useUpdateModelMutation,
  useGetAllModelsQuery,
} = modelsApi;
