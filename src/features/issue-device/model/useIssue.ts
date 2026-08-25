import { useCallback, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@/hooks/redux/useRedux';
import { generateDocumentNumber } from '@/shared/lib/document/generateDocumentNumber';
import {
  useCreateIssueProcessMutation,
  useFinalizeIssueProcessMutation,
} from '@/store/api/issueApi';
import { currentUser } from '@/store/slices/authSlice';
import { resetDevices } from '@/store/slices/deviceSlice';
import { resetAllSignatures } from '@/store/slices/signatureSlice';
import { partnerUser, resetUser, resetUsers } from '@/store/slices/userSlice';
import { RootState } from '@/store/store';
import { handleApiError } from '@/utils/errors/handleApiError';

import {
  clearSelectedDevices,
  resetIssueData,
  setAssignedDevice,
  // setDeviceId,
  setDevicesListVisible,
  setIssueBackStep,
  setIssueNextStep,
  setIssueNumber,
  setIssueStep,
  setProcessId,
  setWarehouse,
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
  const selectedDevices = useAppSelector((state: RootState) => state.issue.selectedDevices);

  const [issueFile, setIssueFile] = useState<Blob | null>(null);
  const { processId, assignedDevices } = issueState;

  const [
    finalizeIssue,
    { isSuccess: isIssueSuccess, isLoading: isIssueLoading, error: finalizeIssueError },
  ] = useFinalizeIssueProcessMutation();

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
  }, [dispatch, issueState.issueNumber]);

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
  const handleStartIssueByList = () => {
    if (selectedDevices.length === 0) return;

    const device = selectedDevices[0];
    dispatch(setWarehouse(device.warehouse)); // todo
    dispatch(setIssueStep(1));
    dispatch(setAssignedDevice(selectedDevices));
    dispatch(clearSelectedDevices());
    navigate(`/issues/new`);
  };

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
    const warehouseId = warehouseController.currentWarehouse?.id;

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
    warehouseController.currentWarehouse?.id,
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
    handleResetDeviceQuery,
    handleResetIssue,
    handleResetIssueDevices,
    handleSetStep,
    handleStartNewIssue,
    handleStartIssueByList,
    handleDeleteIssueProcess,
  };

  const data = {
    issueState,
    issueFile,
  };

  const status = {
    isIssueLoading,
    isIssueSuccess,
    isCreateIssueProcessLoading,

    errors: {
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
