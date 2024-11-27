import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { apiSlice } from '../slices/authSlice';

export const authApi = apiSlice.injectEndpoints({
    endpoints: builder => ({

    })
});