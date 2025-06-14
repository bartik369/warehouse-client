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
import { typesApi } from './api/typesApi';
import { modelsApi } from './api/modelsApi';
import { rolesApi } from './api/rolesApi';
import { deviceIssueApi } from './api/deviceIssueApi';
import authReducer from './slices/authSlice';
import { modalReducer } from '../reducers/modal/modalReducer';
import deviceReducer from './slices/deviceSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    device: deviceReducer,
    modal: modalReducer,
    [authApi.reducerPath]: authApi.reducer,
    [devicesApi.reducerPath]: devicesApi.reducer,
    [contractorApi.reducerPath]: contractorApi.reducer,
    [warehousesApi.reducerPath]: warehousesApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [manufacturersApi.reducerPath]: manufacturersApi.reducer,
    [typesApi.reducerPath]: typesApi.reducer,
    [modelsApi.reducerPath]: modelsApi.reducer,
    [locationApi.reducerPath]: locationApi.reducer,
    [departmentApi.reducerPath]: departmentApi.reducer,
    [permissionApi.reducerPath]: permissionApi.reducer,
    [rolesApi.reducerPath]: rolesApi.reducer,
    [deviceIssueApi.reducerPath]: deviceIssueApi.reducer,
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
        typesApi.middleware,
        modelsApi.middleware,
        departmentApi.middleware,
        permissionApi.middleware,
        rolesApi.middleware,
        deviceIssueApi.middleware,
      ),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;