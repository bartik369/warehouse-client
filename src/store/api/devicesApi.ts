import { IDevice, IDeviceModel, ISelectedItem, IEntity } from './../../types/devices';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../baseQueryWithReauth';

export const devicesApi = createApi({
    reducerPath: 'devicesApi',
    baseQuery: baseQueryWithReauth,
    tagTypes:[],
    endpoints:(build) => ({
        getDevices: build.query({
            query: () => ({
                url: `${import.meta.env.VITE_DEVICES}`,
                method: 'GET',
            })
        }),
        getDevice: build.query({
            query: (id: string) => ({
                url: `${import.meta.env.VITE_DEVICE}/${id}`,
                method: 'GET',
            })
        }),
        createDevice: build.mutation<IDevice, FormData>({
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
                    method: 'GET',
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
        getModels: build.query<any, any>({
            query({manufacturer, type}) {
                return {
                    url: `${import.meta.env.VITE_MODELS}${manufacturer}/${type}`,
                    method: 'GET',
                }
            }
        }),
        getTypes: build.query<IEntity[], void>({
            query() {
                return {
                    url:`${import.meta.env.VITE_TYPES}`,
                    method: 'GET',
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
    // useCreateDeviceModelMutation,
    useGetManufacturersQuery,
    useCreateManufacturerMutation,
    useCreateModelMutation,
    useCreateTypeMutation,
    useGetTypesQuery,
} = devicesApi;