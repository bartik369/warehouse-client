import { useDebounce } from '@/hooks/data/useDebounce.ts';
import { useAppDispatch, useAppSelector } from '@/hooks/redux/useRedux';
import { useLazyGetDeviceQuery, useLazySearchDevicesQuery } from '@/store/api/devicesApi';
import {
  useCreateIssueMutation,
  useCreateIssueProcessMutation,
  useFinalizeIssueProcessMutation,
} from '@/store/api/issueApi';
import { useLazyGetFilteredUsersQuery, useLazyGetUserQuery } from '@/store/api/userApi';
import { useLazyGetWarehousesByUserQuery } from '@/store/api/warehousesApi';
import { currentUser } from '@/store/slices/authSlice';
import { resetDevices, setDevices } from '@/store/slices/deviceSlice';
import { resetAllSignatures } from '@/store/slices/signatureSlice';
import { partnerUser, resetUser, resetUsers, setUser, setUsers } from '@/store/slices/userSlice';
import { Device } from '@/types/devices';
import { Warehouse } from '@/types/locations';
import { handleApiError } from '@/utils/errors/handleApiError';
import { generateActNumber } from '@/utils/nums/generateActNumber';
import { useCallback, useEffect, useMemo, useReducer } from 'react';
import { initialIssueState, issueReducer } from './issueReducer';
import { IssueActionTypes } from './issueTypes';

export const useIssue = () => {
  const [state, dispatch] = useReducer(issueReducer, initialIssueState);
  const { userQuery } = state;
  const { processId, devices } = state.deviceIssueData;
  const userDebouncedQuery = useDebounce(userQuery, 700);
  const recipient = useAppSelector(partnerUser);
  const creator = useAppSelector(currentUser);
  const userDispatch = useAppDispatch();
  const deviceDispatch = useAppDispatch();
  const signatureDispatch = useAppDispatch();
  const [finalizeIssue, { isSuccess: isIssueSuccess, isLoading: isIssueLoading }] =
    useFinalizeIssueProcessMutation();
  const [createIssue] = useCreateIssueMutation();
  const [createIssueProcess] = useCreateIssueProcessMutation();
  const [getFilteredUsers, { isSuccess, isFetching }] = useLazyGetFilteredUsersQuery();
  const [getBasicUser] = useLazyGetUserQuery();
  const [getDevice] = useLazyGetDeviceQuery();
  const [getWarehousesByUser] = useLazyGetWarehousesByUserQuery();
  const [searchDevices] = useLazySearchDevicesQuery();

  const handleGetDevice = useCallback(async () => {
    try {
      if (state.deviceQuery) {
        const data = await searchDevices(state.deviceQuery).unwrap();
        deviceDispatch(setDevices(data));
        dispatch({
          type: IssueActionTypes.SET_DEVICES_LIST_VISIBLE,
          payload: true,
        });
        dispatch({
          type: IssueActionTypes.SET_WAS_SEARCHED,
          payload: true,
        });
        dispatch({
          type: IssueActionTypes.SET_DEVICES_LOADED,
          payload: true,
        });
      }
    } catch (err: unknown) {
      handleApiError(err);
    }
  }, [deviceDispatch, searchDevices, state.deviceQuery]);

  const handleSetStep = useCallback((step: number) => {
    dispatch({
      type: IssueActionTypes.SET_STEP,
      payload: step,
    });
  }, []);

  const handleStartDeviceIssueWith = useCallback(
    async (id: string) => {
      if (!id) return;
      dispatch({
        type: IssueActionTypes.SET_DEVICE_ID,
        payload: id,
      });
      const data = await getDevice(id).unwrap();
      const { warehouse, warehouseId, model, ...rest } = data;
      const warehouseData = {
        id: warehouseId,
        name: warehouse.name,
        slug: warehouse.slug,
      };
      const deviceData = {
        ...rest,
        modelName: model.name,
        typeName: model.type.name,
        manufacturerName: model.manufacturer.name,
        warehouseId: warehouseId,
      };
      dispatch({
        type: IssueActionTypes.SET_ASSIGNED_DEVICES,
        payload: [deviceData],
      });
      dispatch({
        type: IssueActionTypes.SET_WAREHOUSE,
        payload: warehouseData,
      });
    },
    [getDevice]
  );

  const handleCompleteProcess = useCallback(
    async (file: Blob) => {
      if (!file) return;
      try {
        dispatch({
          type: IssueActionTypes.SET_PDF_FILE,
          payload: file,
        });
        const issueData = new FormData();
        issueData.append('processId', state.deviceIssueData?.processId);
        issueData.append('file', file);
        const data = await finalizeIssue(issueData).unwrap();
        if (data) {
          dispatch({ type: IssueActionTypes.NEXT_STEP });
        }
      } catch (err: unknown) {
        handleApiError(err);
      }
    },
    [finalizeIssue, userDispatch, recipient, devices, processId]
  );

  const handleUserChange = useCallback((value: string) => {
    dispatch({
      type: IssueActionTypes.SET_USER_QUERY,
      payload: value,
    });
    dispatch({
      type: IssueActionTypes.SET_USERS_LIST_VISIBLE,
      payload: true,
    });
  }, []);

  const handleUsers = useCallback(
    async (query: string) => {
      try {
        const data = await getFilteredUsers(query).unwrap();
        userDispatch(setUsers(data));
      } catch (err: unknown) {
        handleApiError(err);
      }
    },
    [getFilteredUsers, userDispatch]
  );

  const handleResetUser = useCallback(() => {
    userDispatch(resetUser());
  }, [dispatch, userDispatch]);

  const handleDeviceChange = useCallback(
    (value: string) => {
      dispatch({
        type: IssueActionTypes.SET_DEVICE_QUERY,
        payload: value,
      });
    },
    [dispatch]
  );

  const handleSetUser = useCallback(
    async (id: string) => {
      try {
        const data = await getBasicUser(id).unwrap();
        userDispatch(setUser({ user: data }));
        handleNextStep();
        userDispatch(resetUsers());
        dispatch({
          type: IssueActionTypes.SET_WAS_SEARCHED,
          payload: false,
        });
        dispatch({
          type: IssueActionTypes.SET_PROCESS_ID,
          payload: generateActNumber(),
        });
      } catch (err: unknown) {
        handleApiError(err);
      }
    },
    [userDispatch, dispatch, getBasicUser]
  );

  const handleGetWarehousesByUser = useCallback(
    async (userId: string) => {
      try {
        const data = await getWarehousesByUser(userId).unwrap();
        dispatch({
          type: IssueActionTypes.SET_WAREHOUSES,
          payload: data,
        });
        dispatch({
          type: IssueActionTypes.SET_WAS_SEARCHED,
          payload: false,
        });
      } catch (err: unknown) {
        handleApiError(err);
      }
    },
    [dispatch, getWarehousesByUser]
  );

  const handleSetWarehouse = useCallback(
    (item: Warehouse) => {
      dispatch({
        type: IssueActionTypes.SET_WAREHOUSE,
        payload: item,
      });
      handleNextStep();
    },
    [dispatch]
  );

  const handleSetDevice = useCallback(
    (device: Device) => {
      dispatch({
        type: IssueActionTypes.SET_ASSIGNED_DEVICES,
        payload: [device],
      });
      dispatch({
        type: IssueActionTypes.SET_DEVICE_ID,
        payload: device.id,
      });
      dispatch({
        type: IssueActionTypes.SET_WAS_SEARCHED,
        payload: false,
      });
      deviceDispatch(resetDevices());
    },
    [dispatch, deviceDispatch]
  );

  const handleDeleteDevice = useCallback(
    (id: string) => {
      dispatch({
        type: IssueActionTypes.DELETE_DEVICE,
        payload: id,
      });
    },
    [dispatch]
  );

  const handleFullReset = useCallback(() => {
    userDispatch(resetUser());
    signatureDispatch(resetAllSignatures());
    deviceDispatch(resetDevices());
    dispatch({ type: IssueActionTypes.RESET_DEVICE_ISSUE_DATA });
  }, [userDispatch, deviceDispatch, dispatch]);

  const handleResetUserQuery = useCallback(() => {
    dispatch({ type: IssueActionTypes.RESET_USER_QUERY });
  }, [dispatch]);

  const handleResetDeviceQuery = useCallback(() => {}, []);

  const handleResetIssueDevices = useCallback(() => {
    dispatch({ type: IssueActionTypes.RESET_DEVICE_ISSUE_DATA });
  }, [dispatch]);

  const handleCreateIssueProcess = async () => {
    try {
      const documentNumber = state.deviceIssueData.processId;
      const partner = recipient.id;
      const current = creator?.id;
      const warehouse = state.warehouse.id;
      if (!documentNumber || !partner || !warehouse || !current) return;

      const processData = {
        documentNo: documentNumber,
        userId: partner,
        warehouseId: warehouse,
        issuedById: current,
        status: state.step,
      };
      const data = await createIssueProcess(processData).unwrap();
    } catch (err: unknown) {
      handleApiError(err);
    }
  };

  const handleCreateIssue = async () => {
    try {
      const { processId, devices } = state.deviceIssueData;
      if (!processId || !devices.length) return;
      const data = await createIssue(state.deviceIssueData).unwrap();
    } catch (err: unknown) {
      handleApiError(err);
    }
  };
  const handleNextStep = () => {
    dispatch({ type: IssueActionTypes.NEXT_STEP });
  };

  useEffect(() => {
    if (userDebouncedQuery.length > 1) {
      handleUsers(userDebouncedQuery);
      dispatch({
        type: IssueActionTypes.SET_WAS_SEARCHED,
        payload: true,
      });
    } else {
      userDispatch(resetUsers());
      dispatch({
        type: IssueActionTypes.SET_WAS_SEARCHED,
        payload: false,
      });
    }
  }, [userDebouncedQuery]);

  useEffect(() => {
    switch (state.step) {
      case 1:
        break;
      case 2:
        handleCreateIssueProcess();
        break;
      case 3:
        handleCreateIssue();
        break;
      default:
    }
  }, [state.step]);

  const actions = useMemo(
    () => ({
      handleCompleteProcess,
      handleUserChange,
      handleFullReset,
      handleSetUser,
      handleResetUser,
      handleResetUserQuery,
      handleGetDevice,
      handleStartDeviceIssueWith,
      handleDeviceChange,
      handleSetDevice,
      handleSetWarehouse,
      handleGetWarehousesByUser,
      handleResetDeviceQuery,
      handleDeleteDevice,
      handleResetIssueDevices,
      handleNextStep,
      handleSetStep,
    }),
    [
      handleCompleteProcess,
      handleUserChange,
      handleFullReset,
      handleSetUser,
      handleNextStep,
      handleResetUser,
      handleResetUserQuery,
      handleGetDevice,
      handleStartDeviceIssueWith,
      handleDeviceChange,
      handleSetDevice,
      handleSetWarehouse,
      handleGetWarehousesByUser,
      handleResetDeviceQuery,
      handleDeleteDevice,
      handleResetIssueDevices,
      handleSetStep,
    ]
  );

  const value = useMemo(
    () => ({
      state,
      isSuccess,
      isFetching,
      isIssueSuccess,
      isIssueLoading,
      dispatch,
      actions,
    }),
    [state, isSuccess, isFetching, isIssueSuccess, isIssueLoading, dispatch, actions]
  );

  return value;
};
