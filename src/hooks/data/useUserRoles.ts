import { email } from './../../utils/constants/constants';
import { useCallback, useEffect, useReducer } from 'react';
import { useLocation, useNavigate} from 'react-router-dom';
import { handleApiError } from '../../utils/errors/handleApiError';
import { toast } from 'react-toastify';
import { userReducer, userInitialState } from '../../reducers/user/userReducer';
import { userRoleReducer, userRoleInitialState } from '../../reducers/roles/userRoleReducer';
import { IUserRole } from '../../types/access';
import { UserRoleActionsTypes } from '../../reducers/roles/userRoleTypes';
import { useLazyGetFilteredUsersQuery } from '../../store/api/userApi';
import { useLazyGetUserRolesQuery } from '../../store/api/rolesApi';
import { FormValidation, ValidateField } from '../../utils/validation/UserRoleValidation';
import { useDebounce } from './useDebounce.ts';
import { UserActionTypes } from '../../reducers/user/userTypes';
import { useGrantRoleMutation } from '../../store/api/rolesApi';
import { IUser } from '../../types/user';

export const useUserRoles = () => {
  const  [userState, dispatchUser]  = useReducer(userReducer, userInitialState);
  const  [roleState, dispatchUserRole]  = useReducer(userRoleReducer, userRoleInitialState);
  const { role, query } = roleState;
  const debouncedQuery = useDebounce(query, 700);
  const navigate = useNavigate();
  const location = useLocation();
  const [fetchUsers] = useLazyGetFilteredUsersQuery();
  const [fetchUserRolesData] = useLazyGetUserRolesQuery();
  const [grantRole] = useGrantRoleMutation();
   
  const handleFetchUsers = useCallback(async () => {
    try {
      dispatchUserRole({
        type: UserRoleActionsTypes.SET_WAS_SEARCHED,
        payload: true,
      });
      const data = await fetchUsers(debouncedQuery).unwrap();
        dispatchUser({ type: UserActionTypes.SET_USERS, payload: data });
    } catch (err: unknown) {
      handleApiError(err);
    }
  }, [query, debouncedQuery]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    if (debouncedQuery.length > 0) {
      params.set('search', debouncedQuery);
      navigate({
        pathname: location.pathname,
        search: params.toString(),
      }, { replace: true });
      handleFetchUsers();
    } else {
      params.delete('search');
      navigate({ pathname: location.pathname, search: params.toString() }, { replace: true });
      dispatchUser({ type: UserActionTypes.SET_USERS, payload: []});
      dispatchUserRole({
        type: UserRoleActionsTypes.SET_WAS_SEARCHED,
        payload: false,
      });
    }
  }, [debouncedQuery]);


  const handleInputChange = useCallback(
    <T extends string | IUserRole>(field: keyof IUserRole, value: T) => {
      if (field === 'email') {
        dispatchUserRole({
          type: UserRoleActionsTypes.SET_USERS_LIST_VISIBLE,
          payload: true,
        });
      }
      dispatchUserRole({ 
        type: UserRoleActionsTypes.SET_QUERY, 
        payload: value as string
      });
      const validateErrors = ValidateField(field, value);
      dispatchUserRole({ 
        type: UserRoleActionsTypes.SET_ERROR, 
        payload: { [field]: validateErrors as string }
      });
      dispatchUserRole({ 
        type: UserRoleActionsTypes.SET_ROLE, 
        payload: { [field]: value as string }
      });
    },[]);

  const handleAddUserRole = useCallback(async () => {
      try {
        const validateErrors = FormValidation(role);
        dispatchUserRole({
          type: UserRoleActionsTypes.SET_ERROR,
          payload: validateErrors as Record<string, string>
        })

        if (Object.values(validateErrors).length === 0) {
          if (!role) return;
          console.log(role)
          const updateData = {
            ...role,
          };
          const data = await grantRole(updateData).unwrap();
          if (data) {
            toast(data?.message, { type: 'success' });
          }
        }
      } catch (err) {
       handleApiError(err);
      }
    },[role]);

    console.log(role)

    const handleUserInfo = async (item: IUser) => {
     try {
      if (!item) return;
      dispatchUserRole({
        type: UserRoleActionsTypes.SET_ROLE,
        payload: {
          email: item.email ?? "",
          userId: item.id ?? "",
        },
      });
      dispatchUserRole({
        type: UserRoleActionsTypes.SET_USERS_LIST_VISIBLE,
        payload: false,
      });
      const data = await fetchUserRolesData(item.id).unwrap();
      dispatchUserRole({ 
        type: UserRoleActionsTypes.SET_USER_ASSIGNED_ROLES,
        payload: data,
      });
     } catch (err: unknown) {
      handleApiError(err);
     }
    };
    
    const handleResetUserRole = () => {
      dispatchUserRole({ type: UserRoleActionsTypes.RESET_ROLE });
      dispatchUserRole({ type: UserRoleActionsTypes.RESET_ERROR });
      dispatchUserRole({ type: UserRoleActionsTypes.RESET_USER_ASSIGNED_ROLES })
    }
    
  return { 
    roleState,
    userState,
    actions: {
      handleInputChange,
      handleAddUserRole,
      handleResetUserRole,
      handleUserInfo,
    }
  };
};
