import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../baseQueryWithReauth';

export const warehousesApi = createApi({
    reducerPath: 'warehousesApi',
    baseQuery: baseQueryWithReauth,
    tagTypes:[],
    endpoints:(build) => ({
        getWarehouses: build.query<any, void>({
            query:() => ({
                url: `${import.meta.env.VITE_WAREHOUSES}`,
                method: 'GET',
            })
        })
    })
});

export const {useGetWarehousesQuery} = warehousesApi