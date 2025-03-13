import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../baseQueryWithReauth";
import { ILocation } from "../../types/locations";

export const locationApi = createApi({
  reducerPath: "locationApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: [],
  endpoints: (build) => ({
    getLocations: build.query<ILocation[], void>({
      query: () => ({
        url: `${import.meta.env.VITE_LOCATIONS}`,
      }),
    }),
    getLocation: build.query({
      query: () => ({
        url: ``,
      }),
    }),
    createLocation: build.mutation({
      query: (body) => ({
        url: ``,
        method: "POST",
        body,
      }),
    }),
    updateLocation: build.mutation({
      query: (body) => ({
        url: ``,
        method: "PATCH",
        body,
      }),
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
