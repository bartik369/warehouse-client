import { useAppDispatch } from './../../../hooks/redux/useRedux';
import { useCallback, useEffect, useReducer } from "react";
import { useLazyGetIssueQuery } from "../../../store/api/deviceIssueApi";
import { handleApiError } from "../../../utils/errors/handleApiError";
import { issueReducer, initialIssueState } from "./issueReducer";
import { IssueActionTypes, IssueStepType } from "./issueTypes";
import { useDebounce } from "../../../hooks/data/useDebounce.ts";
import { useLazyGetUserQuery } from "../../../store/api/userApi";
import { useLazyGetFilteredUsersQuery } from "../../../store/api/userApi";
import { useLazySearchDevicesQuery } from "../../../store/api/devicesApi";
import { resetUser, resetUsers, setUser, setUsers } from "../../../store/slices/userSlice";
import { resetDevices, setDevices } from '../../../store/slices/deviceSlice';
import { useLazyGetDeviceQuery } from '../../../store/api/devicesApi';
import { useLazyGetWarehousesByUserQuery } from '../../../store/api/warehousesApi';
import { Device } from '../../../types/devices';
import { Warehouse } from '../../../types/locations';

export const useIssue = () => {
  const [state, dispatch] = useReducer(issueReducer, initialIssueState);
  const userDispatch = useAppDispatch();
  const deviceDispatch = useAppDispatch();
  const { userQuery } = state;
  const userDebouncedQuery = useDebounce(userQuery, 700);
  const [getIssue] = useLazyGetIssueQuery();
  const [getFilteredUsers, { isSuccess, isFetching }] = useLazyGetFilteredUsersQuery();
  const [getBasicUser] = useLazyGetUserQuery();
  const [getDevice] = useLazyGetDeviceQuery();
  const [ getWarehousesByUser] = useLazyGetWarehousesByUserQuery();
  const [searchDevices] = useLazySearchDevicesQuery();

  const handleGetDevice = useCallback(async() => {
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
  },[deviceDispatch, state.deviceQuery]);

  const handleStartDeviceIssueWith = useCallback(async (id: string) => {
    if (!id) return;
    dispatch({
      type: IssueActionTypes.SET_DEVICE_ID,
      payload: id,
    });
    const data = await getDevice(id).unwrap();
    const { warehouse, warehouseId } = data;
    const warehouseData = {
      id: warehouseId,
      name: warehouse.name,
      slug: warehouse.slug,
    }
    dispatch({ 
      type: IssueActionTypes.SET_ASSIGNED_DEVICES,
      payload: [data]
    });
    dispatch({
      type: IssueActionTypes.SET_WAREHOUSE,
      payload: warehouseData,
    });
  }, []);

 /// ????
  const handleDeviceIssue = async (id: string) => {
    if (!id) return;
    try {
      const data = await getIssue(id).unwrap();
      userDispatch(setUser(data.user));
      dispatch({
        type: IssueActionTypes.SET_ISSUE_ID,
        payload: data.id,
      });
    } catch (err: unknown) {
      handleApiError(err);
    }
  };

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

  const handleUsers = useCallback(async (query: string) => {
    try {
      const data = await getFilteredUsers(query).unwrap();
      userDispatch(setUsers(data));
    } catch (err: unknown) {
      handleApiError(err);
    }
  }, [dispatch]);

  const handleResetUser = useCallback(() => {
    userDispatch(resetUser());
  }, [dispatch])

  const handleDeviceChange = useCallback((value: string) => {
    dispatch({ 
      type: IssueActionTypes.SET_DEVICE_QUERY,
      payload: value,
    });
  }, [])

  const handleSetUser = useCallback(async (id: string) => {
    try {
      const data = await getBasicUser(id).unwrap();
      userDispatch(setUser({ user: data}));
      userDispatch(resetUsers());
      dispatch({
        type: IssueActionTypes.SET_WAS_SEARCHED,
        payload: false,
      });
    } catch (err: unknown) {
      handleApiError(err);
    }
  }, []);
  const handleGetWarehousesByUser = useCallback(async(userId: string) => {
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
  }, [dispatch]);

  const handleSetWarehouse = useCallback((item: Warehouse) => {
    dispatch({
      type: IssueActionTypes.SET_WAREHOUSE,
      payload: item,
    });
  }, [dispatch]);

  const handleSetDevice = useCallback((device: Device) => {
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
  },[])

  const handleDeleteDevice = (id: string) => {
    dispatch({
      type: IssueActionTypes.DELETE_DEVICE,
      payload: id,
    })
  }

  const handleSetStepInfo = (step: IssueStepType) => {
    dispatch({ 
      type: IssueActionTypes.SET_STEP,
      payload: step,
    });
    dispatch({ type: IssueActionTypes.RESET_USER_QUERY });
    dispatch({ type: IssueActionTypes.RESET_DEVICE_QUERY });
  }
  const handleFullReset = useCallback(() => {
    userDispatch(resetUser());
    deviceDispatch(resetDevices());
    dispatch({ type: IssueActionTypes.RESET_DEVICE_ISSUE_DATA });
  }, []);

  const handleNextStep = useCallback(() => {
    dispatch({ type: IssueActionTypes.NEXT_STEP });
  }, [dispatch])

  const handleEquipmentList = useCallback((items: string[]) => {
    
  },[]);

  const handleResetUserQuery = () => {
    dispatch({ type: IssueActionTypes.RESET_USER_QUERY });
  }

  const handleResetDeviceQuery = () => {

  }

  const handleResetIssueDevices = () => {
    dispatch({ type: IssueActionTypes.RESET_DEVICE_ISSUE_DATA })
  }

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

  return {
    state,
    isSuccess,
    isFetching,
    dispatch,
    actions: {
        handleDeviceIssue,
        handleUserChange,
        handleFullReset,
        handleSetUser,
        handleResetUser,
        handleResetUserQuery,
        handleSetStepInfo,
        handleNextStep,
        handleEquipmentList,
        handleGetDevice,
        handleStartDeviceIssueWith,
        handleDeviceChange,
        handleSetDevice,
        handleSetWarehouse,
        handleGetWarehousesByUser,
        handleResetDeviceQuery,
        handleDeleteDevice,
        handleResetIssueDevices,
    }
  };
};
