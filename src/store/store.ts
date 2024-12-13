import { configureStore } from '@reduxjs/toolkit';
import { authApi } from "./api/authApi";
import { devicesApi } from './api/devicesApi';
import { userApi } from './api/userApi';
import authReducer from './slices/authSlice';

const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [devicesApi.reducerPath]: devicesApi.reducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
        authApi.middleware,
        devicesApi.middleware,
        userApi.middleware,
        ),
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 