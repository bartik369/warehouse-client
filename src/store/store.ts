import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './api/authApi';
import { devicesApi } from './api/devicesApi';
import { warehousesApi } from './api/warehousesApi';
import { userApi } from './api/userApi';
import authReducer from './slices/authSlice';
import deviceReducer from './slices/deviceSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    device: deviceReducer,
    [authApi.reducerPath]: authApi.reducer,
    [devicesApi.reducerPath]: devicesApi.reducer,
    [warehousesApi.reducerPath]: warehousesApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(
        authApi.middleware,
        devicesApi.middleware,
        warehousesApi.middleware,
        userApi.middleware,
      ),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;