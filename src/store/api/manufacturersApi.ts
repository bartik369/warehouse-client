import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../baseQueryWithReauth";
import { IEntity } from "../../types/devices";

export const manufacturersApi = createApi({
  reducerPath: "manufacturersApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Manufacturer"],
  endpoints: (build) => ({
    getManufacturer: build.query({
      query: (id: string) => ({
        url: `${import.meta.env.VITE_MANUFACTURERS}${id}`,
      }),
    }),
    getManufacturers: build.query<IEntity[], void>({
      query() {
        return {
          url: `${import.meta.env.VITE_MANUFACTURERS}`,
          refetchOnMountOrArgChange: true,
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: "Manufacturer" as const,
                id,
              })),
              { type: "Manufacturer", id: "LIST" },
            ]
          : [{ type: "Manufacturer", id: "LIST" }],
    }),
    createManufacturer: build.mutation<any, FormData>({
      query(body) {
        return {
          url: `${import.meta.env.VITE_MANUFACTURERS}`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Manufacturer"],
    }),
    updateManufacturer: build.mutation({
      query: ({ id, ...body }) => ({
        url: `${import.meta.env.VITE_MANUFACTURERS}${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Manufacturer"],
    }),
  }),
});


export const {
    useGetManufacturersQuery,
    useCreateManufacturerMutation,
    useUpdateManufacturerMutation,
     useLazyGetManufacturerQuery,
} = manufacturersApi;

