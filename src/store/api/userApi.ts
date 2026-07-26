import { createApi } from '@reduxjs/toolkit/query/react';

import { User } from '@/types/user';

import { baseQueryWithReauth } from '../baseQueryWithReauth';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: [],
  endpoints: (build) => ({
    getUsers: build.query<User[], void>({
      query: () => ({
        url: `${import.meta.env.VITE_USERS}`,
      }),
    }),
    getUser: build.query<User, string>({
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
} = userApi;
