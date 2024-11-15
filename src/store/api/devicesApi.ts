import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const devicesApi = createApi({
    reducerPath: 'devicesApi',
    baseQuery: fetchBaseQuery({baseUrl: 'localhost'}),
    tagTypes:[],
    endpoints:(builder) => ({
        getDevices: builder.query({
            query: () => 'devices'
        }),
        getDevice: builder.query({
            query: (id) => ({
                url: `device/${id}`
            })
        }),
        addDevice: builder.mutation({
            query(body) {
                return {
                    url: '',
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
    useGetDevicesQuery,
    useGetDeviceQuery,
    // useUpdateDeviceMutation,
    useDeleteDeviceMutation,

} = devicesApi;