import { IDevice, IEntity, IFilterDeviceOptions, 
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
        getModels: build.query<IEntity[], any>({
            query({manufacturer, type}) {
                return {
                    url: `${import.meta.env.VITE_MODELS}${manufacturer}/${type}`,
                }
            },
            providesTags: (result) =>
                result
                  ? [
                      ...result.map(({ id }) => ({ type: 'Model' as const, id })),
                      { type: 'Model', id: 'LIST' },
                    ]
                  : [{ type: 'Model', id: 'LIST' }],
        }),
        createModel: build.mutation<any, FormData>({
            query(body) {
                return {
                    url:`${import.meta.env.VITE_MODELS}`,
                    method: 'POST',
                    body,
                }
            },
            invalidatesTags: ['Model'],
        }),
        getTypes: build.query<IEntity[], void>({
            query() {
                return {
                    url:`${import.meta.env.VITE_TYPES}`,
                }
            },
            providesTags: (result) =>
                result
                  ? [
                      ...result.map(({ id }) => ({ type: 'Type' as const, id })),
                      { type: 'Type', id: 'LIST' },
                    ]
                  : [{ type: 'Type', id: 'LIST' }],
        }),
        createType: build.mutation<any, FormData>({
            query(body) {
                return {
                    url:`${import.meta.env.VITE_TYPES}`,
                    method: 'POST',
                    body,
                }
            },
            invalidatesTags: ['Type'],
        })
    })
})

export const  {
    useCreateDeviceMutation,
    useGetDevicesQuery,
    useGetDeviceQuery,
    useGetModelsQuery,
    useGetDeviceOptionsQuery,
    useCreateModelMutation,
    useCreateTypeMutation,
    useGetTypesQuery,
} = devicesApi;