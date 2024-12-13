import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../baseQueryWithReauth';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: baseQueryWithReauth,
    tagTypes:[],
    endpoints: build => ({
        profile: build.query({
            query: (id: string) => ({
                url: `${import.meta.env.VITE_USER_PROFILE}/${id}`,
                method: 'GET',
            })
        })
    })
});

export const {useProfileQuery} = userApi;