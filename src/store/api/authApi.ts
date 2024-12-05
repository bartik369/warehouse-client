import { apiSlice } from '../slices/apiSlice';
import { logOut, setCredentials, setAuth } from '../slices/authSlice';
import { IUser, ILogin } from '../../types/user';

export const authApi = apiSlice.injectEndpoints({
    endpoints: build =>({
        signupUser:build.mutation({
            query: (credentials) => ({
                url: ``,
                method: 'POST',
                body: {...credentials}
            }),
        }),
        signin:build.mutation<IUser, ILogin>({
            query: (credentials) => ({
                url: `${import.meta.env.VITE_API_URL}${import.meta.env.VITE_AUTH}`,
                method: 'POST',
                body: {...credentials},
            })
        }),
        logoutUser: build.mutation({
            query: () => ({
                url: ``,
                method: 'POST',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled
                    dispatch(logOut(null))
                } catch (err) {
                    console.log(err)
                }
            }
        }),
        refresh: build.mutation({
            query:() => ({
                url: ``,
                method: 'GET',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setCredentials(data));
                    dispatch(setAuth(true));
                } catch (err) {
                    if (err) {
                        dispatch(logOut(null));
                        dispatch(setAuth(false));
                    }
                }
            }
        }),
        verifyToken: build.mutation({
            query:(token) => ({
                url: ``,
                method: 'GET',
                // headers: { Authorization: `Bearer ${token}`}
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    dispatch(setCredentials(data))
                    dispatch(setAuth(true))
                } catch (err) {
                    dispatch(logOut(null));
                    dispatch(setAuth(false));
                }
            }
        }),
        profileUser: build.query({
            query: (id) => ({
                url: ``,
                method: 'GET'
            }),
        }),
    })
});

export const {
    useSigninMutation, 
    useSignupUserMutation,
    useLogoutUserMutation,
    useProfileUserQuery,
    useRefreshMutation,
    useVerifyTokenMutation,
} = authApi;