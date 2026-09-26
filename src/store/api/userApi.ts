import { createApi } from '@reduxjs/toolkit/query/react';
import { keyof } from 'zod';

import { SortedUserRes, User } from '@/entities/user/model/types';
import { UserQueryParams } from '@/shared/types/api';

import { baseQueryWithReauth } from '../baseQueryWithReauth';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User'],
  endpoints: (build) => ({
    getUsers: build.query<SortedUserRes, UserQueryParams>({
      query: (queryParams) => {
        const { ...params } = queryParams;
        const urlParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
          if (value == null || (Array.isArray(value) && value.length === 0)) {
            return;
          }
          if (Array.isArray(value)) {
            urlParams.append(key, value.join(','));
            return;
          }
          urlParams.append(key, String(value));
        });
        return {
          url: `${import.meta.env.VITE_USERS_SEARCH}?${urlParams.toString()}`,
        };
      },
      providesTags: (result) =>
        result?.items
          ? [
              ...result.items.map(({ id }) => ({ type: 'User' as const, id })),
              { type: 'User', id: 'LIST' },
            ]
          : [{ type: 'User', id: 'LIST' }],
    }),
    getUser: build.query<User, string | null>({
      query: (id: string) => ({
        url: `${import.meta.env.VITE_USERS}${id}`,
      }),
    }),
    profile: build.query({
      query: (id: string) => ({
        url: `${import.meta.env.VITE_USER_PROFILE}/${id}`,
      }),
    }),
    createUser: build.mutation<{ user: User; message: string }, User>({
      query: (body) => ({
        url: `${import.meta.env.VITE_USERS}`,
        method: 'POST',
        body,
      }),
    }),
    getFilteredUsers: build.query<User[], string>({
      query: (search: string) => ({
        url: `${import.meta.env.VITE_SORTED_USERS}`,
        params: {
          search,
        },
      }),
    }),
  }),
});

export const {
  useLazyProfileQuery,
  useCreateUserMutation,
  useGetUsersQuery,
  useGetFilteredUsersQuery,
  useLazyGetFilteredUsersQuery,
  useLazyGetUserQuery,
  useGetUserQuery,
} = userApi;
