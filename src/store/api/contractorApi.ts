import { createApi } from '@reduxjs/toolkit/query/react';

import { Contractor } from '@/entities/contractor/model/types';

import { baseQueryWithReauth } from '../baseQueryWithReauth';

export const contractorApi = createApi({
  reducerPath: 'contractorApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Contractor'],
  endpoints: (build) => ({
    getContractors: build.query<Contractor[], void>({
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
    getContractor: build.query<Contractor, string>({
      query: (id: string) => ({
        url: `${import.meta.env.VITE_CONTRACTORS}${id}`,
      }),
      providesTags: (_result, _error, id) => [
        {
          type: 'Contractor',
          id,
        },
      ],
    }),
    createContractor: build.mutation<Contractor, Omit<Contractor, 'id'>>({
      query(body) {
        return {
          url: `${import.meta.env.VITE_CONTRACTORS}`,
          method: 'POST',
          body,
        };
      },
      invalidatesTags: [
        {
          type: 'Contractor',
          id: 'LIST',
        },
      ],
    }),
    updateContractor: build.mutation<Contractor, Contractor>({
      query: ({ id, ...body }) => ({
        url: `${import.meta.env.VITE_CONTRACTORS}${id}`,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        {
          type: 'Contractor',
          id,
        },
        {
          type: 'Contractor',
          id: 'LIST',
        },
      ],
    }),
  }),
});

export const {
  useCreateContractorMutation,
  useGetContractorsQuery,
  useGetContractorQuery,
  useUpdateContractorMutation,
} = contractorApi;
