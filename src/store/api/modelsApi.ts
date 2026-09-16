import { createApi } from '@reduxjs/toolkit/query/react';

import { DeviceModelResponse, Model, SortedModelRes } from '@/entities/model/model/types';
import { QueryParams } from '@/shared/types/api';

import { baseQueryWithReauth } from '../baseQueryWithReauth';

export const modelsApi = createApi({
  reducerPath: 'modelsApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Model'],
  endpoints: (build) => ({
    getModels: build.query<SortedModelRes, QueryParams>({
      query(queryParams) {
        const { ...params } = queryParams;
        const urlParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
          if (
            value === null ||
            value === undefined ||
            (Array.isArray(value) && value.length === 0)
          ) {
            return;
          }

          if (Array.isArray(value)) {
            urlParams.append(key, value.join(','));
            return;
          }

          urlParams.append(key, String(value));
        });
        return {
          url: `${import.meta.env.VITE_MODELS_UNITED}?${urlParams.toString()}`,
        };
      },
      providesTags: (result) =>
        result?.items
          ? [
              ...result.items.map(({ id }) => ({ type: 'Model' as const, id })),
              { type: 'Model', id: 'LIST' },
            ]
          : [{ type: 'Model', id: 'LIST' }],
    }),
    getModelsByManufacturerAndType: build.query<
      Model[],
      { manufacturerId: string; typeId: string }
    >({
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
  useGetModelsByManufacturerAndTypeQuery,
} = modelsApi;
