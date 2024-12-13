import { createApi } from '@reduxjs/toolkit/query/react';
import { logOut, setCredentials, setAuth } from '../slices/authSlice';
import { IUser, ISignin, IAuthRes } from '../../types/user';
import { baseQueryWithReauth } from '../baseQueryWithReauth';

export const authApi = createApi({
    reducerPath:'authApi',
    baseQuery: baseQueryWithReauth,
    tagTypes:[],
    endpoints: build =>({
        signin:build.mutation<IAuthRes, ISignin>({
            query: (credentials) => ({
                url: `${import.meta.env.VITE_API_URL}${import.meta.env.VITE_AUTH}`,
                method: 'POST',
                body: {...credentials},
            })
        }),
        logoutUser: build.mutation({
            query: () => ({
                url: `${import.meta.env.VITE_API_URL}${import.meta.env.VITE_LOGOUT}`,
                method: 'POST',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled
                    localStorage.removeItem('accessToken');
                    dispatch(logOut(null))
                } catch (err) {
                    console.log(err)
                }
            }
        }),
        refresh: build.mutation({
            query:() => ({
                url: import.meta.env.VITE_REFRESH_TOKEN,
                method: 'POST',
            }),
        }),
        validToken: build.query({
            query:() => ({
                url:import.meta.env.VITE_VALID_TOKEN
            })
        })
    })
});

export const {
    useSigninMutation, 
    useLogoutUserMutation,
    useRefreshMutation,
} = authApi;