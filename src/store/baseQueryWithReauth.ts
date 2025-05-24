import { RefreshTokenResponse } from './../types/user';
import {fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError} from '@reduxjs/toolkit/query';
import { setCredentials, logOut, setAuth } from './slices/authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_API_URL}`,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery(
      import.meta.env.VITE_REFRESH_TOKEN,
      api,
      extraOptions
    ) as  {data?: RefreshTokenResponse};
  
    if (refreshResult.data) {
      localStorage.setItem('accessToken', refreshResult.data.accessToken);
      api.dispatch(setCredentials(refreshResult.data.user));
      api.dispatch(setAuth(true));
      result = await baseQuery(args, api, extraOptions);
    } else {
      localStorage.removeItem('accessToken');
      api.dispatch(logOut(null));
    }
  }
  return result;
};