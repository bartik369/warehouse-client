import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './api/authApi';
import { devicesApi } from './api/devicesApi';
import { contractorApi } from './api/contractorApi';
import { warehousesApi } from './api/warehousesApi';
import { locationApi } from './api/locationApi';
import { departmentApi } from './api/departmentApi';
import { permissionApi } from './api/permissionApi';
import { userApi } from './api/userApi';
import { manufacturersApi } from './api/manufacturersApi';
import authReducer from './slices/authSlice';
import deviceReducer from './slices/deviceSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    device: deviceReducer,
    [authApi.reducerPath]: authApi.reducer,
    [devicesApi.reducerPath]: devicesApi.reducer,
    [contractorApi.reducerPath]: contractorApi.reducer,
    [warehousesApi.reducerPath]: warehousesApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [manufacturersApi.reducerPath]: manufacturersApi.reducer,
    [locationApi.reducerPath]: locationApi.reducer,
    [departmentApi.reducerPath]: departmentApi.reducer,
    [permissionApi.reducerPath]: permissionApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(
        authApi.middleware,
        devicesApi.middleware,
        contractorApi.middleware,
        warehousesApi.middleware,
        locationApi.middleware,
        userApi.middleware,
        manufacturersApi.middleware,
        departmentApi.middleware,
        permissionApi.middleware,
      ),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;