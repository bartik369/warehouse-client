import { RefreshTokenResponse } from './../types/user';
import {fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import getCookie from '@/utils/secure/getCookie';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError} from '@reduxjs/toolkit/query';
import { setCredentials, logOut, setAuth } from './slices/authSlice';

const API_URL = import.meta.env.VITE_API_URL 
  || (import.meta.env.NODE_ENV === 'development' 
    ? 'http://localhost:5000' 
    : '/api');

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  credentials: 'include',
  prepareHeaders: (headers) => {
    const csrfToken = getCookie('csrfToken');
    if (csrfToken) {
      headers.set('x-csrf-token', csrfToken);
    }
    return headers;
  }
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
      api.dispatch(setCredentials(refreshResult.data.user));
      api.dispatch(setAuth(true));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }
  return result;
};