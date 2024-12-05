import { RootState } from '../store';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError} from '@reduxjs/toolkit/query';
import { setCredentials, logOut, setAuth } from "./authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  credentials: 'same-origin', 
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
     if (token) {
            headers.set("authorization", `Bearer ${token}`);
        }
        return headers;
  }
})

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 403) {
    const refreshResult:any = await baseQuery('/refresh-token/', api, extraOptions);

    if (refreshResult.data && refreshResult.data instanceof Object)  {
      localStorage.setItem('accessToken', refreshResult.data.token);
      api.dispatch(setCredentials(refreshResult.data))
      api.dispatch(setAuth(true));
      result = await baseQuery(args, api, extraOptions)

    } else {
      api.dispatch(logOut(null))
    }
  }
  return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({

    })
});