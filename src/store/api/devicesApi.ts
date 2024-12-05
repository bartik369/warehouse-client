import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const devicesApi = createApi({
    reducerPath: 'devicesApi',
    baseQuery: fetchBaseQuery({baseUrl: 'localhost'}),
    tagTypes:[],
    endpoints:(builder) => ({
        getDevices: builder.query({
            query: () => 'devices'
        }),
        createDevice: builder.mutation({
            query(body) {
                return {
                    url: `${import.meta.env.VITE_API_URL}${import.meta.env.VITE_ADD_DEVICE}`,
                    method: 'POST',
                    body,
                }
            }
        }),
        // updateDevice: builder.mutation({
        //     query(data) {
        //         return {
        //             const {id, ...body} = data;
        //             url: `device/${id}`,
        //             method: 'PUT',
        //             body,
        //         }
        //     }
        // }),
        deleteDevice: builder.mutation({
            query(id) {
                return {
                    url: `device/${id}`,
                    method: 'DELETE',
                }
            }
        }), 
    })
})

export const  {
    useCreateDeviceMutation,

} = devicesApi;