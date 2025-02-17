import { IDevice, IEntity, IFilterDeviceOptions } from './../../types/devices';
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
                console.log(city);
                
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
        getDeviceOptions: build.query<IFilterDeviceOptions, void>({
            query:() => ({
                url:`${import.meta.env.VITE_OPTIONS}`,
            })
        }),
        getDevice: build.query({
            query: (id: string) => ({
                url: `${import.meta.env.VITE_DEVICE}/${id}`,
            })
        }),
        createDevice: build.mutation<IDevice, IDevice>({
            query(body) {
                return {
                    url: `${import.meta.env.VITE_DEVICES}`,
                    method: 'POST',
                    body,
                }
            }
        }),
        // createDeviceModel: build.mutation<IDeviceModel & {message: string}, FormData>({
        //     query(body) {
        //         return {
        //             url:`${import.meta.env.VITE_MODELS}`,
        //             method: 'POST',
        //             body,
        //         }
        //     }
        // }),
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
    useGetModelsQuery,
    useGetDeviceOptionsQuery,
    // useCreateDeviceModelMutation,
    useGetManufacturersQuery,
    useCreateManufacturerMutation,
    useCreateModelMutation,
    useCreateTypeMutation,
    useGetTypesQuery,
} = devicesApi;