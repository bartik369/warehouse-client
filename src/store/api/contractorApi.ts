import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../baseQueryWithReauth';
import { Entity } from '../../types/devices';

export const contractorApi = createApi({
    reducerPath: 'contractorApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Contractor'],
    endpoints:(build) => ({
        getContractors: build.query<Entity[], void>({
            query: () => ({
                url: `${import.meta.env.VITE_CONTRACTORS}`,
            }),
            providesTags: (result) =>
                result
                  ? [
                      ...result.map(({ id }) => ({ type: 'Contractor' as const, id })),
                      { type: 'Contractor', id: 'LIST' },
                    ]
                  : [{ type: 'Contractor', id: 'LIST' }],
        }),
        getContractor: build.query<Entity, string>({
            query:(id:string) => ({
                url: `${import.meta.env.VITE_CONTRACTORS}${id}`,
            })
        }),
        createContractor: build.mutation<{message:string, contractor:Entity}, Partial<Entity>>({
            query(body) {
                return {
                    url: `${import.meta.env.VITE_CONTRACTORS}`,
                    method: 'POST',
                    body,
                }
            },
            invalidatesTags: ['Contractor'],
        }),
        updateContractor: build.mutation<{ message:string, contractor: Entity}, { id: string } & Partial<Entity>>({
            query:({ id, ...body }) => ({
                url: `${import.meta.env.VITE_CONTRACTORS}${id}`,
                method: 'PUT',
                body: body,
            }),
            invalidatesTags: ['Contractor'],
        }),
    })
});

export const { 
    useCreateContractorMutation, 
    useGetContractorsQuery,
    useLazyGetContractorQuery,
    useUpdateContractorMutation,
 } = contractorApi;