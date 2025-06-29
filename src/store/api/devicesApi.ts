import {
  Device,
  FilterDeviceOptions,
  AggregateDeviceInfo,
  QueryParams,
  FilteredDevicesFromBack,
} from "@/types/devices";
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../baseQueryWithReauth";

export const devicesApi = createApi({
  reducerPath: "devicesApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Device", "Manufacturer", "Model", "Type"],
  endpoints: (build) => ({
    getDevices: build.query<{ devices: FilteredDevicesFromBack[], totalPages: number}, QueryParams>({
      query: (queryParams) => {
        const { city, ...params } = queryParams;
        const urlParams = new URLSearchParams();

        Object.entries(params).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            urlParams.append(key, value.join(","));
          } else {
            urlParams.append(key, String(value));
          }
        });
        const cityUrl = city ? `/locations/${city}` : "/locations";
        return `/devices${cityUrl}?${urlParams.toString()}`;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.devices.map(({ id }) => ({
                type: "Device" as const,
                id,
              })),
              { type: "Device", id: "LIST" },
            ]
          : [{ type: "Device", id: "LIST" }],
    }),
    getDeviceOptions: build.query<FilterDeviceOptions, string>({
      query: (city) => ({
        url: `${import.meta.env.VITE_OPTIONS}${city}`,
      }),
    }),
    getDevice: build.query<AggregateDeviceInfo, string>({
      query: (id: string) => ({
        url: `${import.meta.env.VITE_DEVICES}${id}`,
      }),
    }),
    
    createDevice: build.mutation<{ message: string; device: Device }, Device>(
      {
        query(body) {
          return {
            url: `${import.meta.env.VITE_DEVICES}`,
            method: "POST",
            body,
          };
        },
      }
    ),
     searchDevices: build.query<Device[], string>({
      query: (q: string) => ({
        url: `${import.meta.env.VITE_SEARCH_DEVICES}`,
        params: { q }
      }),
    }),
    updateDevice: build.mutation<
      { message: string; device: Device },
      { id: string } & Partial<Device>
    >({
      query: ({ id, ...body }) => ({
        url: `${import.meta.env.VITE_DEVICES}${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Device", id },
        { type: "Device", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useCreateDeviceMutation,
  useUpdateDeviceMutation,
  useGetDevicesQuery,
  useLazyGetDeviceQuery,
  useGetDeviceOptionsQuery,
  useLazySearchDevicesQuery,
} = devicesApi;
