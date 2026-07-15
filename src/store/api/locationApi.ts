import { createApi } from '@reduxjs/toolkit/query/react';

import { Location } from '@/entities/location/model/types';

import { baseQueryWithReauth } from '../baseQueryWithReauth';

export const locationApi = createApi({
  reducerPath: 'locationApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Location'],
  endpoints: (build) => ({
    getLocations: build.query<Location[], void>({
      query: () => ({
        url: `${import.meta.env.VITE_LOCATIONS}`,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Location' as const, id })),
              { type: 'Location', id: 'LIST' },
            ]
          : [{ type: 'Location', id: 'LIST' }],
    }),
    getLocation: build.query<Location, string>({
      query: (id: string) => ({
        url: `${import.meta.env.VITE_LOCATIONS}${id}`,
      }),
      providesTags: (_result, _error, id) => [
        {
          type: 'Location',
          id,
        },
      ],
    }),
    createLocation: build.mutation<Location, Omit<Location, 'id'>>({
      query: (body) => ({
        url: `${import.meta.env.VITE_LOCATIONS}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [
        {
          type: 'Location',
          id: 'LIST',
        },
      ],
    }),
    updateLocation: build.mutation<Location, Location>({
      query: ({ id, ...body }) => ({
        url: `${import.meta.env.VITE_LOCATIONS}${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        {
          type: 'Location',
          id,
        },
        {
          type: 'Location',
          id: 'LIST',
        },
      ],
    }),
    deleteLocation: build.query({
      query: () => ({
        url: ``,
      }),
    }),
  }),
});

export const {
  useGetLocationsQuery,
  useGetLocationQuery,
  useCreateLocationMutation,
  useUpdateLocationMutation,
  useDeleteLocationQuery,
} = locationApi;
