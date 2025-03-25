import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../baseQueryWithReauth';

export const permissionApi = createApi({
    reducerPath: 'permissionApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: [],
    endpoints: (build) => ({
        createRole: build.mutation({
            query: (body) => ({
                url: ``,
                method: 'POST',
                body
            })
        }),
        createPermission: build.mutation({
            query: (body) => ({
                url: ``,
                method: 'POST',
                body
            })
        }),

    })
})

export const { 
    useCreateRoleMutation, 
    useCreatePermissionMutation } = permissionApi