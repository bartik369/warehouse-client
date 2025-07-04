import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../baseQueryWithReauth';
import { Entity } from '@/types/devices';

export const locationApi = createApi({
  reducerPath: "locationApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Location"],
  endpoints: (build) => ({
    getLocations: build.query<Entity[], void>({
      query: () => ({
        url: `${import.meta.env.VITE_LOCATIONS}`,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Location" as const, id })),
              { type: "Location", id: "LIST" },
            ]
          : [{ type: "Location", id: "LIST" }],
    }),
    getLocation: build.query<Entity, string>({
      query: (id: string) => ({
        url: `${import.meta.env.VITE_LOCATIONS}${id}`,
      }),
    }),
    createLocation: build.mutation<
      { message: string; location: Entity },
      Entity
    >({
      query: (body) => ({
        url: `${import.meta.env.VITE_LOCATIONS}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Location"],
    }),
    updateLocation: build.mutation<
      { message: string; updatedLocation: Entity },
      { id: string } & Partial<Entity>
    >({
      query: ({ id, ...body }) => ({
        url: `${import.meta.env.VITE_LOCATIONS}${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Location"],
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
