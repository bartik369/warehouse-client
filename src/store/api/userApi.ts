import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../baseQueryWithReauth';
import { IUser } from '../../types/user';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: baseQueryWithReauth,
    tagTypes:[],
    endpoints: build => ({
        getUsers: build.query<IUser[], void>({
            query: () => ({
                url: `${import.meta.env.VITE_USERS}`, 
            })
        }),
        profile: build.query({
            query: (id: string) => ({
                url: `${import.meta.env.VITE_USER_PROFILE}/${id}`,
                method: 'GET',
            })
        }),
        createUser: build.mutation<IUser, IUser>({
            query:(body) => ({
                url: `${import.meta.env.VITE_USERS}`,
                method: 'POST',
                body,
            })
        }),
    })
});

export const {
    useProfileQuery, 
    useCreateUserMutation,
    useGetUsersQuery,
} = userApi;