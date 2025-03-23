import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../baseQueryWithReauth';
import { IAdminEntity } from '../../types/content';

export const locationApi = createApi({
  reducerPath: 'locationApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Location'],
  endpoints: (build) => ({
    getLocations: build.query<IAdminEntity[], void>({
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
    getLocation: build.query<IAdminEntity, string>({
      query: (id: string) => ({
        url: `${import.meta.env.VITE_LOCATIONS}${id}`,
      }),
    }),
    createLocation: build.mutation({
      query: (body) => ({
        url: ``,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Location'],
    }),
    updateLocation: build.mutation({
      query: ({id, ...body}) => ({
        url: `${import.meta.env.VITE_LOCATIONS}${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Location'],
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
  useLazyGetLocationQuery,
  useCreateLocationMutation,
  useUpdateLocationMutation,
  useDeleteLocationQuery,
} = locationApi;
