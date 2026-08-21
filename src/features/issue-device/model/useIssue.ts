import { useCallback, useEffect, useMemo, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { Warehouse } from '@/entities/warehouse/model/types';
import { useAppDispatch, useAppSelector } from '@/hooks/redux/useRedux';
import { useDebounce } from '@/shared/lib/debounce/useDebounce';
import { generateDocumentNumber } from '@/shared/lib/document/generateDocumentNumber';
import { useLazyGetDeviceQuery, useLazySearchDevicesQuery } from '@/store/api/devicesApi';
import {
  useCreateIssueMutation,
  useCreateIssueProcessMutation,
  useFinalizeIssueProcessMutation,
} from '@/store/api/issueApi';
import { useGetLocationsQuery } from '@/store/api/locationApi';
import { useLazyGetFilteredUsersQuery, useLazyGetUserQuery } from '@/store/api/userApi';
import { useGetWarehousesQuery, useLazyGetWarehousesByUserQuery } from '@/store/api/warehousesApi';
import { currentUser } from '@/store/slices/authSlice';
import { resetDevices, setDevices } from '@/store/slices/deviceSlice';
import { resetAllSignatures } from '@/store/slices/signatureSlice';
import { partnerUser, resetUser, resetUsers, setUser, setUsers } from '@/store/slices/userSlice';
import { AssignedDevice } from '@/types/issue';
import { handleApiError } from '@/utils/errors/handleApiError';
import { generateActNumber } from '@/utils/nums/generateActNumber';

import {
  resetIssueData,
  setAssignedDevice,
  // setDeviceId,
  setDevicesListVisible,
  setDevicesLoaded,
  setIssueBackStep,
  setIssueNextStep,
  setIssueNumber,
  setIssueStep,
  setProcessId,
  setWasSearched,
} from '../../../store/slices/issueSlice';
import { IssueProcessStatus } from './types';
import { useDevice } from './useDevice';
import { useUser } from './useUser';
import { useWarehouse } from './useWarehouse';

export const useIssue = () => {
  const userController = useUser();
  const warehouseController = useWarehouse();
  const deviceController = useDevice();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const issueState = useAppSelector((rootState) => rootState.issue);

  const recipient = useAppSelector(partnerUser);
  const creator = useAppSelector(currentUser);
  const [issueFile, setIssueFile] = useState<Blob | null>(null);
  const { processId, assignedDevices } = issueState;
  const userDebouncedQuery = useDebounce(userController.userQuery.trim(), 700);
  const [getBasicUser, { isFetching: isUserFetching }] = useLazyGetUserQuery();
  const [getDevice, { isFetching: isDeviceFetching }] = useLazyGetDeviceQuery();

  console.log(assignedDevices);

  const [getWarehousesByUser, { isFetching: isWarehousesByUserFetching }] =
    useLazyGetWarehousesByUserQuery();

  const [
    finalizeIssue,
    { isSuccess: isIssueSuccess, isLoading: isIssueLoading, error: finalizeIssueError },
  ] = useFinalizeIssueProcessMutation();

  const [createIssue, { isLoading: isCreateIssueLoading, error: createIssueError }] =
    useCreateIssueMutation();

  const [
    createIssueProcess,
    { isLoading: isCreateIssueProcessLoading, error: createIssueProcessError },
  ] = useCreateIssueProcessMutation();

  const handleSetStep = useCallback(
    (step: number) => {
      dispatch(setIssueStep(step));
    },
    [dispatch]
  );

  const handleStartDeviceIssueWith = useCallback(
    async (id: string) => {
      if (!id) {
        return;
      }

      try {
        const data = await getDevice(id).unwrap();

        const { warehouse, warehouseId, model, ...device } = data;

        const warehouseData = {
          id: warehouseId,
          name: warehouse.name,
          slug: warehouse.slug,
        };

        const deviceData = {
          ...device,
          modelName: model.name,
          typeName: model.type.name,
          manufacturerName: model.manufacturer.name,
          warehouseId,
        };

        // dispatch(setWarehouse(warehouseData));

        dispatch(setAssignedDevice(deviceData));

        // dispatch(setDeviceId(deviceData.id));
      } catch (error: unknown) {
        handleApiError(error);
      }
    },
    [dispatch, getDevice]
  );

  const handleCompleteProcess = useCallback(
    async (file: Blob) => {
      if (!file || !processId) return;

      try {
        const data = {
          processId,
          deviceIds: assignedDevices.map((item) => item.id),
          file,
        };
        await finalizeIssue(data).unwrap();
        setIssueFile(file);
        dispatch(setIssueNextStep());
      } catch (error: unknown) {
        handleApiError(error);
      }
    },
    [processId, assignedDevices, dispatch, finalizeIssue]
  );

  const handleResetDeviceQuery = useCallback(() => {
    // dispatch(setDeviceQuey(''));
    dispatch(setDevicesListVisible(false));
    dispatch(setWasSearched(false));
    dispatch(resetDevices());
  }, [dispatch]);

  const handleResetIssueDevices = useCallback(() => {
    dispatch(resetIssueData());
  }, [dispatch]);

  const handleBackStep = useCallback(() => {
    const processId = issueState.processId;
    if (processId && issueState.issueStep <= 2) {
      return;
    }
    dispatch(setIssueBackStep());
  }, [dispatch, processId, issueState.issueStep]);

  const handleProceedToSigning = useCallback(() => {
    if (!issueState.issueNumber) {
      dispatch(setIssueNumber(generateDocumentNumber('AV')));
    }
    handleNextStep();
  }, [dispatch]);

  const handleResetIssue = useCallback(() => {
    dispatch(resetIssueData());
    dispatch(setIssueStep(0));
    dispatch(resetUser());
  }, [dispatch]);

  const handleFullReset = useCallback(() => {
    dispatch(resetUser());
    dispatch(resetUsers());
    dispatch(resetAllSignatures());
    dispatch(resetDevices());
    dispatch(resetIssueData());
  }, [dispatch]);

  const handleStartNewIssue = () => {
    handleFullReset();
    navigate('/issues/new');
  };

  // const handleCreateIssue = useCallback(async () => {
  //   if (!processId || selectedDevices.length === 0) {
  //     return;
  //   }

  //   try {
  //     await createIssue(issueState.deviceIssueData).unwrap();
  //   } catch (error: unknown) {
  //     handleApiError(error);
  //   }
  // }, [createIssue, devices.length, processId, issueState.deviceIssueData]);

  // useEffect(() => {
  //   switch (state.issueStep) {
  //     case 2:
  //       void handleCreateIssueProcess();
  //       break;

  //     case 3:
  //       void handleCreateIssue();
  //       break;

  //     default:
  //       break;
  //   }
  // }, [handleCreateIssue, handleCreateIssueProcess, state.issueStep]);

  const user = {
    data: {
      currentUser: userController.currentUser,
      assignedUserDevices: userController.assignedUserDevices,
      users: userController.users,
      query: userController.userQuery,
      options: userController.userOptions,
      wasSearched: userController.wasSearched,
    },
    actions: {
      handleChange: userController.handleChange,
      handleSelect: userController.handleSelect,
      handleReset: userController.handleReset,
    },
    status: {
      isUsersLoading: userController.isLoading,
      isUsersSuccess: userController.isSuccess,
      isUsersFetching: userController.isFetching,
      assignedDevicesLoading: userController.assignedDevicesLoading,
    },
  };

  const warehouse = {
    data: {
      currentWarehouse: warehouseController.currentWarehouse,
      warehouses: warehouseController.warehouses,
      locations: warehouseController.locations,
      selectedLocation: warehouseController.locationName,
    },
    actions: {
      handleSelect: warehouseController.handleSelect,
      handleReset: warehouseController.handleReset,
    },
    status: {
      isLoadingWarehouses: warehouseController.isLoadingWarehouses,
      isLoadingLocations: warehouseController.isLoadingLocations,
    },
  };

  const handleDeleteIssueProcess = (id: string) => {
    if (!id) return;
    console.log(id);
  };

  const handleCreateIssueProcess = useCallback(async () => {
    const documentNo = issueState.issueNumber || generateDocumentNumber('AV');
    const partnerId = recipient?.id;
    const currentUserId = creator?.id;
    const warehouseId = warehouseController.currentWarehouse.id;

    if (!documentNo || !partnerId || !currentUserId || !warehouseId) {
      return null;
    }

    try {
      const process = await createIssueProcess({
        documentNo,
        userId: partnerId,
        warehouseId,
        issuedById: currentUserId,
        status: IssueProcessStatus.Draft,
      }).unwrap();
      dispatch(setProcessId(process.id));
      dispatch(setIssueNumber(process.documentNo));
      navigate(`/issues/${process.id}/edit`);

      return process;
    } catch (error: unknown) {
      handleApiError(error);
      return null;
    }
  }, [
    createIssueProcess,
    creator?.id,
    recipient?.id,
    issueState.issueNumber,
    warehouseController.currentWarehouse.id,
    dispatch,
    navigate,
  ]);

  const handleNextStep = useCallback(async () => {
    if (issueState.issueStep === 1 && !issueState.processId) {
      const process = await handleCreateIssueProcess();

      if (!process) return;
    }

    dispatch(setIssueNextStep());
  }, [dispatch, issueState.issueStep, issueState.processId, handleCreateIssueProcess]);

  const device = {
    data: {
      selectedDevice: deviceController.device,
      devices: deviceController.devices,
      options: deviceController.options,
      query: deviceController.query,
      value: deviceController.inputValue,
    },
    actions: {
      handleChange: deviceController.handleChange,
      handleSelect: deviceController.handleSelect,
      handleDelete: deviceController.handleDelete,
      handleReset: deviceController.handleReset,
      handleResetList: deviceController.handleResetDeviceList,
    },
    status: {
      isLoading: deviceController.isLoading,
      wasSearched: deviceController.wasSearched,
    },
  };

  const actions = {
    handleNextStep,
    handleBackStep,
    handleProceedToSigning,
    handleCompleteProcess,
    handleFullReset,
    // handleGetDevice,
    handleResetDeviceQuery,
    handleResetIssue,
    handleResetIssueDevices,
    handleSetStep,
    handleStartDeviceIssueWith,
    handleStartNewIssue,
    handleDeleteIssueProcess,
    // handleUserChange,
  };

  const data = {
    issueState,
    issueFile,
  };

  const status = {
    isUserFetching,
    isDeviceFetching,
    isWarehousesByUserFetching,
    isIssueLoading,
    isIssueSuccess,
    isCreateIssueLoading,
    isCreateIssueProcessLoading,

    errors: {
      createIssue: createIssueError,
      createIssueProcess: createIssueProcessError,
      finalizeIssue: finalizeIssueError,
    },
  };

  return {
    userController: user,
    deviceController: device,
    warehouseController: warehouse,
    actions,
    data,
    status,
    issueState,
  };
};

export type UseIssueResult = ReturnType<typeof useIssue>;
export type IssueActions = UseIssueResult['actions'];
export type IssueData = UseIssueResult['data'];
export type IssueStatus = UseIssueResult['status'];
export type IssueState = UseIssueResult['issueState'];

export type IssueUser = UseIssueResult['userController'];
export type IssueDevice = UseIssueResult['deviceController'];
export type IssueWarehouse = UseIssueResult['warehouseController'];
