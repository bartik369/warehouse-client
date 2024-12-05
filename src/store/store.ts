import { configureStore } from '@reduxjs/toolkit';
import { authApi } from "./api/authApi";
import { devicesApi } from './api/devicesApi';
import { apiSlice } from './slices/apiSlice';
import authReducer from './slices/authSlice';

const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [devicesApi.reducerPath]: devicesApi.reducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
        authApi.middleware,
        devicesApi.middleware,
        ),
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 