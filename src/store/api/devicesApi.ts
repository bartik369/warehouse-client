import { createApi } from '@reduxjs/toolkit/query/react';

import { Device, DeviceDetails } from '@/entities/device/model/types';
import { SearchDevicesParams } from '@/features/issue-device/model/types';
import { AggregateDeviceInfo, FilterDeviceOptions, QueryParams } from '@/types/devices';

import { baseQueryWithReauth } from '../baseQueryWithReauth';

export const devicesApi = createApi({
  reducerPath: 'devicesApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Device', 'Manufacturer', 'Model', 'Type'],
  endpoints: (build) => ({
    getDevices: build.query<{ devices: Device[]; totalCount: number }, QueryParams>({
      query: (queryParams) => {
        const { city, ...params } = queryParams;

        const urlParams = new URLSearchParams();

        Object.entries(params).forEach(([key, value]) => {
          if (
            value === null ||
            value === undefined ||
            value === '' ||
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

        return `/devices/locations/${city}?${urlParams.toString()}`;
      },
    }),
    getDeviceOptions: build.query<FilterDeviceOptions, string>({
      query: (city) => ({
        url: `${import.meta.env.VITE_OPTIONS}${city}`,
      }),
    }),
    getDevice: build.query<DeviceDetails, string>({
      query: (id: string) => ({
        url: `${import.meta.env.VITE_DEVICES}${id}`,
      }),
    }),

    createDevice: build.mutation<{ message: string; device: Device }, Device>({
      query(body) {
        return {
          url: `${import.meta.env.VITE_DEVICES}`,
          method: 'POST',
          body,
        };
      },
    }),
    searchDevices: build.query<Device[], SearchDevicesParams>({
      query: ({ q, warehouseId }) => ({
        url: `${import.meta.env.VITE_SEARCH_DEVICES}`,
        params: { q, warehouseId },
      }),
    }),
    updateDevice: build.mutation<
      { message: string; device: Device },
      { id: string } & Partial<Device>
    >({
      query: ({ id, ...body }) => ({
        url: `${import.meta.env.VITE_DEVICES}${id}`,
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Device', id },
        { type: 'Device', id: 'LIST' },
      ],
    }),
    getAssignedDevices: build.query<Device[], { userId: string }>({
      query: ({ userId }) => ({
        url: `${import.meta.env.VITE_DEVICES_ASSIGNED_USER}${userId}`,
        method: 'GET',
      }),
    }),
    getDevicesByIssueProcess: build.query<Device[], string>({
      query: (processId) => ({
        url: `${import.meta.env.VITE_DEVICES}${processId}/devices`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useCreateDeviceMutation,
  useUpdateDeviceMutation,
  useGetDevicesQuery,
  useLazyGetDeviceQuery,
  useGetDeviceQuery,
  useGetDeviceOptionsQuery,
  useLazySearchDevicesQuery,
  useSearchDevicesQuery,
  useGetAssignedDevicesQuery,
  useGetDevicesByIssueProcessQuery,
} = devicesApi;
