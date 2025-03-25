import { baseQueryWithReauth } from './../baseQueryWithReauth';
import { createApi } from '@reduxjs/toolkit/query/react';

export const inventoryApi = createApi({
    reducerPath: 'inventoryApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: [],
    endpoints:(builder) => ({
        getgetInventorys: builder.query({
            query: () => 'inventorys'
        }),
        getInventory: builder.query({
            query:(id) => ({
                url: `inventory/${id}`
            })
        }),
        beginInventory: builder.mutation({
            query(body) {
                return {
                    url: '',
                    method: 'POST',
                    body,
                }
            }
        })
    })
})