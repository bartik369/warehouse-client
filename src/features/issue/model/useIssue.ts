import { useCallback, useEffect, useReducer } from "react";
import { useLazyGetIssueQuery } from "../../../store/api/deviceIssueApi";
import { handleApiError } from "../../../utils/errors/handleApiError";
import { issueReducer, initialIssueState } from "./issueReducer";
import { IssueActionTypes } from "./issueTypes";
import { ValidateField } from "../../../utils/validation/UserValidation";
import { User } from "../../../types/user";
import { useDebounce } from "../../../hooks/data/useDebounce.ts";
import { useLazyGetUserQuery } from "../../../store/api/userApi";
import { useLazyGetFilteredUsersQuery } from "../../../store/api/userApi";

export const useIssue = () => {
  const [state, dispatch] = useReducer(issueReducer, initialIssueState);
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
        type: IssueActionTypes.SET_USER,
        payload: data.user,
      });
      dispatch({
        type: IssueActionTypes.SET_ISSUE_ID,
        payload: data.id,
      });
    } catch (err: unknown) {
      handleApiError(err);
    }
  };

  const handleInputChange = useCallback((field: keyof User, value: string) => {
    dispatch({
      type: IssueActionTypes.SET_QUERY,
      payload: value,
    });
    dispatch({
      type: IssueActionTypes.SET_USERS_LIST_VISIBLE,
      payload: true,
    });
    const validateErrors = ValidateField(field, value);
    dispatch({
      type: IssueActionTypes.SET_ERROR,
      payload: { [field]: validateErrors as string },
    });
  }, []);

  const handleUsers = useCallback(async (query: string) => {
    try {
      const data = await getFilteredUsers(query).unwrap();
      dispatch({
        type: IssueActionTypes.SET_USERS,
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
        type: IssueActionTypes.SET_USER,
        payload: data,
      });
      dispatch({
        type: IssueActionTypes.SET_USERS,
        payload: [],
      });
      dispatch({
        type: IssueActionTypes.SET_WAS_SEARCHED,
        payload: false,
      });
    } catch (err: unknown) {
      handleApiError(err);
    }
  }, []);

  const handleSetStepInfo = (step: string) => {
    dispatch({ type: IssueActionTypes.NEXT_STEP })
  }
  const handleReset = useCallback(() => {
    dispatch({ type: IssueActionTypes.SET_FULL_RESET });
  }, [])

  useEffect(() => {
    if (debouncedQuery.length > 0) {
      handleUsers(debouncedQuery);
      dispatch({
        type: IssueActionTypes.SET_WAS_SEARCHED,
        payload: true,
      });
    } else {
      dispatch({
        type: IssueActionTypes.SET_USERS,
        payload: [],
      });
      dispatch({
        type: IssueActionTypes.SET_WAS_SEARCHED,
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
