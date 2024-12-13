import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../baseQueryWithReauth';

export const devicesApi = createApi({
    reducerPath: 'devicesApi',
    baseQuery: baseQueryWithReauth,
    tagTypes:[],
    endpoints:(build) => ({
        getDevices: build.query({
            query: () => ({
                url: `${import.meta.env.VITE_API_URL}${import.meta.env.VITE_GET_DEVICES}`
            })
        }),
        getDevice: build.query({
            query: (id: string) => ({
                url: `${import.meta.env.VITE_API_URL}${import.meta.env.VITE_GET_DEVICE}`
            })
        }),
        createDevice: build.mutation({
            query(body) {
                return {
                    url: `${import.meta.env.VITE_API_URL}${import.meta.env.VITE_ADD_DEVICE}`,
                    method: 'POST',
                    body,
                }
            }
        }),
    })
})

export const  {
    useCreateDeviceMutation,
    useGetDevicesQuery

} = devicesApi;