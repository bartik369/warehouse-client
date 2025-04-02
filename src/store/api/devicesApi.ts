import { IDevice, IFilterDeviceOptions, 
    IAggregateDeviceInfo, QueryParams } from './../../types/devices';
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../baseQueryWithReauth';

export const devicesApi = createApi({
    reducerPath: 'devicesApi',
    baseQuery: baseQueryWithReauth,
    tagTypes:['Device', 'Manufacturer', 'Model', 'Type'],
    endpoints:(build) => ({
        getDevices: build.query<any, QueryParams>({
            query: (queryParams) => {
                const { city, ...params } = queryParams;
                const urlParams = new URLSearchParams();
        
                Object.entries(params).forEach(([key, value]) => {
                    if (Array.isArray(value)) {
                        urlParams.append(key, value.join(','));
                    } else {
                        urlParams.append(key, String(value));
                    }
                });
                const cityUrl = city ? `/locations/${city}` : '/locations';
                return `/devices${cityUrl}?${urlParams.toString()}`;
            },
        }),
        getDeviceOptions: build.query<IFilterDeviceOptions, string>({
            query:(city) => ({
                url:`${import.meta.env.VITE_OPTIONS}${city}`,
            })
        }),
        getDevice: build.query<IAggregateDeviceInfo, string>({
            query: (id: string) => ({
                url: `${import.meta.env.VITE_DEVICES}${id}`,
            })
        }),
        createDevice: build.mutation<any, IDevice>({
            query(body) {
                return {
                    url: `${import.meta.env.VITE_DEVICES}`,
                    method: 'POST',
                    body,
                }
            },
            // invalidatesTags: ['Device'],
        }),
        updateDevice: build.mutation<any, any>({
            query: ({ id, body }) => ({
                url: `${import.meta.env.VITE_DEVICES}${id}`,
                method: 'PUT',
                body,
            })
        })
    })
})

export const  {
    useCreateDeviceMutation,
    useUpdateDeviceMutation,
    useGetDevicesQuery,
    useLazyGetDeviceQuery,
    useGetDeviceOptionsQuery,
} = devicesApi;