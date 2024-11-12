import { RootState } from '../store';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError} from '@reduxjs/toolkit/query';

const baseQuery = fetchBaseQuery({
    baseUrl: '',
    credentials: 'include',
    prepareHeaders: (headers, {getState}) => {

    }
});


const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 403) {
    const refreshResult:any = await baseQuery('', api, extraOptions);

  }
  return result
}
export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({

    })
});