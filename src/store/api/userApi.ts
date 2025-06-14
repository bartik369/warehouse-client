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
            })
        }),
        createUser: build.mutation<{user: IUser, message: string}, IUser>({
            query:(body) => ({
                url: `${import.meta.env.VITE_USERS}`,
                method: 'POST',
                body,
            })
        }),
        getFilteredUsers: build.query({
            query: (search: string) => ({
                url: `${import.meta.env.VITE_SORTED_USERS}`,
                params: {
                    search,
                }
            })
        }),
    })
});

export const {
    useLazyProfileQuery, 
    useCreateUserMutation,
    useGetUsersQuery,
    useLazyGetFilteredUsersQuery,
} = userApi;