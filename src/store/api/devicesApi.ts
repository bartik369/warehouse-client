import { IDevice, IEntity, IFilterDeviceOptions, IAggregateDeviceInfo } from './../../types/devices';
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../baseQueryWithReauth';

export const devicesApi = createApi({
    reducerPath: 'devicesApi',
    baseQuery: baseQueryWithReauth,
    tagTypes:[],
    endpoints:(build) => ({
        getDevices: build.query({
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
            }
        }),
        getManufacturer: build.query({
            query:(id:string) => ({
                url:`${import.meta.env.VITE_MANUFACTURERS}${id}`,  
            })
        }),
        getManufacturers: build.query<IEntity[], void>({
            query() {
                return {
                    url:`${import.meta.env.VITE_MANUFACTURERS}`,
                    refetchOnMountOrArgChange: true,
                }
            }
        }),
        createManufacturer: build.mutation<any, FormData>({
            query(body) {
                return {
                    url:`${import.meta.env.VITE_MANUFACTURERS}`,
                    method: 'POST',
                    body,
                }
            }
        }),
        createModel: build.mutation<any, FormData>({
            query(body) {
                return {
                    url:`${import.meta.env.VITE_MODELS}`,
                    method: 'POST',
                    body,
                }
            }
        }),
        getModels: build.query<IEntity[], any>({
            query({manufacturer, type}) {
                return {
                    url: `${import.meta.env.VITE_MODELS}${manufacturer}/${type}`,
                }
            }
        }),
        getTypes: build.query<IEntity[], void>({
            query() {
                return {
                    url:`${import.meta.env.VITE_TYPES}`,
                }
            }
        }),
        createType: build.mutation<any, FormData>({
            query(body) {
                return {
                    url:`${import.meta.env.VITE_TYPES}`,
                    method: 'POST',
                    body,
                }
            }
        })
    })
})

export const  {
    useCreateDeviceMutation,
    useGetDevicesQuery,
    useGetDeviceQuery,
    useGetModelsQuery,
    useGetDeviceOptionsQuery,
    useGetManufacturersQuery,
    useCreateManufacturerMutation,
    useCreateModelMutation,
    useCreateTypeMutation,
    useGetTypesQuery,
    useLazyGetManufacturerQuery,
} = devicesApi;