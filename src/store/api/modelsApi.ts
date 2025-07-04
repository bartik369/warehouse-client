import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../baseQueryWithReauth';
import { Entity } from '@/types/devices';

export const modelsApi = createApi({
    reducerPath: 'modelsApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Model'],
    endpoints: (build) => ({
        getModels: build.query<Entity[], { manufacturer: string, type: string } & Partial<Entity>>({
            query({manufacturer, type}) {
                return {
                    url: `${import.meta.env.VITE_MODELS_UNITED}${manufacturer}/${type}`,
                }
            },
          providesTags: (result) =>
            result
              ? [
                  ...result.map(({ id }) => ({ type: 'Model' as const, id })),
                  { type: 'Model', id: 'LIST' },
                ]
              : [{ type: 'Model', id: 'LIST' }],
        }),
        getAllModels: build.query<Entity[], void>({
            query:() => ({
                url: `${import.meta.env.VITE_MODELS_ALL}`,
            })
        }),
        getModel: build.query<Entity, string>({
            query: (id: string) => ({
                url: `${import.meta.env.VITE_MODEL}${id}`,
            }),
        }),
        createModel: build.mutation<Entity, FormData>({
            query:(body) => ({
                url: `${import.meta.env.VITE_MODELS}`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Model']
        }),
        updateModel: build.mutation<Entity, FormData>({
            query: (body) => {
                const id = body.get('id') as string;
                if (!id) throw new Error('Something went wrong')
                return {
                    url: `${import.meta.env.VITE_MODELS}${id}`,
                    method: 'PUT',
                    body: body
                };
            },
            invalidatesTags: ['Model']
        })
      }),
});

export const {
    useLazyGetModelsQuery,
    useLazyGetModelQuery,
    useCreateModelMutation,
    useUpdateModelMutation,
    useGetAllModelsQuery,
} = modelsApi;