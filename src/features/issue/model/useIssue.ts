import { useCallback, useEffect, useMemo } from 'react';

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
import { AssignedDevice } from '@/types/issue';
import { Warehouse } from '@/types/locations';
import { handleApiError } from '@/utils/errors/handleApiError';
import { generateActNumber } from '@/utils/nums/generateActNumber';

import {
  deleteAssignedDevice,
  resetIssueData,
  resetUserQuery,
  setAssignedDevice,
  setDeviceId,
  setDeviceQuey,
  setDevicesListVisible,
  setDevicesLoaded,
  setIssueNextStep,
  setIssueStep,
  setPdfFile,
  setProcessId,
  setUserListVisible,
  setUserQuery,
  setWarehouse,
  setWarehouses,
  setWasSearched,
} from './issueSlice';

export const useIssue = () => {
  const state = useAppSelector((state) => state.issue);
  const { processId, devices } = state.deviceIssueData;
  const userDebouncedQuery = useDebounce(state.userQuery, 700);
  const recipient = useAppSelector(partnerUser);
  const creator = useAppSelector(currentUser);
  const userDispatch = useAppDispatch();
  const deviceDispatch = useAppDispatch();
  const issueDispatch = useAppDispatch();
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
        issueDispatch(setDevicesListVisible(true));
        issueDispatch(setWasSearched(true));
        issueDispatch(setDevicesLoaded(true));
      }
    } catch (err: unknown) {
      handleApiError(err);
    }
  }, [deviceDispatch, searchDevices, state.deviceQuery]);

  const handleSetStep = useCallback((step: number) => {
    issueDispatch(setIssueStep(step));
  }, []);

  const handleStartDeviceIssueWith = useCallback(
    async (id: string) => {
      // if (!id) return;
      // // dispatch({
      // //   type: IssueActionTypes.SET_DEVICE_ID,
      // //   payload: id,
      // // });
      // const data = await getDevice(id).unwrap();
      // const { warehouse, warehouseId, model, ...rest } = data;
      // const warehouseData = {
      //   id: warehouseId,
      //   name: warehouse.name,
      //   slug: warehouse.slug,
      // };
      // const deviceData = {
      //   ...rest,
      //   modelName: model.name,
      //   typeName: model.type.name,
      //   manufacturerName: model.manufacturer.name,
      //   warehouseId: warehouseId,
      // };
      // // issueDispatch(setAssignedDevice(deviceData));
      // // dispatch({
      // //   type: IssueActionTypes.SET_ASSIGNED_DEVICES,
      // //   payload: [deviceData],
      // // });
      // issueDispatch(setWarehouse(warehouseData));
    },
    [getDevice]
  );

  const handleCompleteProcess = useCallback(
    async (file: Blob) => {
      if (!file) return;
      try {
        issueDispatch(setPdfFile(file));
        const issueData = new FormData();
        issueData.append('processId', state.deviceIssueData?.processId);
        issueData.append('file', file);
        const data = await finalizeIssue(issueData).unwrap();
        if (data) {
          issueDispatch(setIssueNextStep());
        }
      } catch (err: unknown) {
        handleApiError(err);
      }
    },
    [finalizeIssue, userDispatch, recipient, devices, processId]
  );

  const handleUserChange = useCallback((value: string) => {
    issueDispatch(setUserQuery(value));
    issueDispatch(setUserListVisible(true));
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
  }, [userDispatch]);

  const handleDeviceChange = useCallback((value: string) => {
    issueDispatch(setDeviceQuey(value));
  }, []);

  const handleSetUser = useCallback(
    async (id: string) => {
      try {
        const data = await getBasicUser(id).unwrap();
        userDispatch(setUser({ user: data }));
        handleNextStep();
        userDispatch(resetUsers());
        issueDispatch(setWasSearched(false));
        issueDispatch(setProcessId(generateActNumber()));
      } catch (err: unknown) {
        handleApiError(err);
      }
    },
    [userDispatch, getBasicUser]
  );

  const handleGetWarehousesByUser = useCallback(
    async (userId: string) => {
      try {
        const data = await getWarehousesByUser(userId).unwrap();
        issueDispatch(setWarehouses(data));
        issueDispatch(setWasSearched(false));
      } catch (err: unknown) {
        handleApiError(err);
      }
    },
    [getWarehousesByUser]
  );

  const handleSetWarehouse = useCallback((item: Warehouse) => {
    issueDispatch(setWarehouse(item));
    handleNextStep();
  }, []);

  const handleSetDevice = useCallback(
    (device: AssignedDevice) => {
      issueDispatch(setAssignedDevice(device));
      issueDispatch(setDeviceId(device.id));
      issueDispatch(setWasSearched(false));
      deviceDispatch(resetDevices());
    },
    [deviceDispatch]
  );

  const handleDeleteDevice = useCallback((id: string) => {
    issueDispatch(deleteAssignedDevice(id));
  }, []);

  const handleFullReset = useCallback(() => {
    userDispatch(resetUser());
    signatureDispatch(resetAllSignatures());
    deviceDispatch(resetDevices());
    issueDispatch(resetIssueData());
  }, [userDispatch, deviceDispatch]);

  const handleResetUserQuery = useCallback(() => {
    issueDispatch(resetUserQuery());
  }, []);

  const handleResetDeviceQuery = useCallback(() => {}, []);

  const handleResetIssueDevices = useCallback(() => {
    issueDispatch(resetIssueData());
  }, []);

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
        status: state.issueStep,
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
    issueDispatch(setIssueNextStep());
  };

  useEffect(() => {
    if (userDebouncedQuery.length > 1) {
      handleUsers(userDebouncedQuery);
      issueDispatch(setWasSearched(true));
    } else {
      userDispatch(resetUsers());
      issueDispatch(setWasSearched(false));
    }
  }, [userDebouncedQuery]);

  useEffect(() => {
    switch (state.issueStep) {
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
  }, [state.issueStep]);

  const actions = useMemo(
    () => ({
      isSuccess,
      isFetching,
      isIssueSuccess,
      isIssueLoading,
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
      isSuccess,
      isFetching,
      isIssueSuccess,
      isIssueLoading,
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
  return actions;
};
