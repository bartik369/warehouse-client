import { useCallback, useEffect, useReducer } from "react";
import { useLazyGetIssueQuery } from "../../store/api/deviceIssueApi";
import { handleApiError } from "../../utils/errors/handleApiError";
import {
  deviceIssueReducer,
  initialState,
} from "../../components/deviceIssue/context44/deviceIssueReducer";
import { DeviceIssueActionTypes } from "../../components/deviceIssue/context44/deviceIssueTypes";
import { ValidateField } from "../../utils/validation/UserValidation";
import { User } from "../../types/user";
import { useDebounce } from "./useDebounce.ts";
import { useLazyGetUserQuery } from "../../store/api/userApi";
import { useLazyGetFilteredUsersQuery } from "../../store/api/userApi";

export const useDeviceIssue = () => {
  const [state, dispatch] = useReducer(deviceIssueReducer, initialState);
  const { query } = state;
  const debouncedQuery = useDebounce(query, 700);
  const [getIssue] = useLazyGetIssueQuery();
  const [getFilteredUsers, { isSuccess, isFetching }] = useLazyGetFilteredUsersQuery();
  const [getBasicUser] = useLazyGetUserQuery();

  const handleDeviceIssue = async (id: string) => {
    if (!id) return;
    try {
      const data = await getIssue(id).unwrap();
      dispatch({
        type: DeviceIssueActionTypes.SET_USER,
        payload: data.user,
      });
      dispatch({
        type: DeviceIssueActionTypes.SET_ISSUE_ID,
        payload: data.id,
      });
    } catch (err: unknown) {
      handleApiError(err);
    }
  };

  const handleInputChange = useCallback((field: keyof User, value: string) => {
    dispatch({
      type: DeviceIssueActionTypes.SET_QUERY,
      payload: value,
    });
    dispatch({
      type: DeviceIssueActionTypes.SET_USERS_LIST_VISIBLE,
      payload: true,
    });
    const validateErrors = ValidateField(field, value);
    dispatch({
      type: DeviceIssueActionTypes.SET_ERROR,
      payload: { [field]: validateErrors as string },
    });
  }, []);

  const handleUsers = useCallback(async (query: string) => {
    try {
      const data = await getFilteredUsers(query).unwrap();
      dispatch({
        type: DeviceIssueActionTypes.SET_USERS,
        payload: data,
      });
    } catch (err: unknown) {
      handleApiError(err);
    }
  }, []);

  const handleSetUser = useCallback(async (id: string) => {
    try {
      const data = await getBasicUser(id).unwrap();
      dispatch({
        type: DeviceIssueActionTypes.SET_USER,
        payload: data,
      });
      dispatch({
        type: DeviceIssueActionTypes.SET_USERS,
        payload: [],
      });
      dispatch({
        type: DeviceIssueActionTypes.SET_WAS_SEARCHED,
        payload: false,
      });
    } catch (err: unknown) {
      handleApiError(err);
    }
  }, []);

  const handleSetStepInfo = (step: string) => {
    dispatch({ type: DeviceIssueActionTypes.NEXT_STEP })
  }
  const handleReset = useCallback(() => {
    dispatch({ type: DeviceIssueActionTypes.SET_FULL_RESET });
  }, [])

  useEffect(() => {
    if (debouncedQuery.length > 0) {
      handleUsers(debouncedQuery);
      dispatch({
        type: DeviceIssueActionTypes.SET_WAS_SEARCHED,
        payload: true,
      });
    } else {
      dispatch({
        type: DeviceIssueActionTypes.SET_USERS,
        payload: [],
      });
      dispatch({
        type: DeviceIssueActionTypes.SET_WAS_SEARCHED,
        payload: false,
      });
    }
  }, [debouncedQuery]);

  return {
    state,
    isSuccess,
    isFetching,
    dispatch,
    actions: {
        handleDeviceIssue,
        handleInputChange,
        handleReset,
        handleSetUser,
        handleSetStepInfo,
    }
  };
};
