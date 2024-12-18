import { createApi } from '@reduxjs/toolkit/query/react';
import { logOut, setCredentials, setAuth } from '../slices/authSlice';
import { ISignin, IAuthRes } from '../../types/user';
import { baseQueryWithReauth } from '../baseQueryWithReauth';
import { useNavigate } from 'react-router-dom';

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
        logoutUser: build.mutation<any, any>({
            query: (id) => ({
                url: `${import.meta.env.VITE_API_URL}${import.meta.env.VITE_LOGOUT}`,
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
        validate: build.query({
            query:() => ({
                url: import.meta.env.VITE_VALIDATE,
            })
        }),
    })
});

export const {
    useSigninMutation, 
    useLogoutUserMutation,
    useRefreshMutation,
    useValidateQuery
} = authApi;