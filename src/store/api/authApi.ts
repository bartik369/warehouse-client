import { createApi } from '@reduxjs/toolkit/query/react';
import { logOut, setCredentials } from '../slices/authSlice';
import { ISignin, IAuthRes, IUser } from '../../types/user';
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
        logoutUser: build.mutation<{ message: string }, string>({
            query: (id) => ({
                url: `${import.meta.env.VITE_LOGOUT}`,
                method: 'POST',
                body: {id: id}
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled
                    localStorage.removeItem('accessToken');
                    setCredentials(null);
                    dispatch(logOut(null));
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
        validate: build.mutation<IUser, null>({
            query:() => ({
                url: import.meta.env.VITE_VALIDATE,
                method: 'POST',
            })
        }),
    })
});

export const {
    useSigninMutation, 
    useLogoutUserMutation,
    useRefreshMutation,
    useValidateMutation
} = authApi;