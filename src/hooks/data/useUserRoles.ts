import { useCallback, useEffect, useReducer, useState } from 'react';
import { useLocation, useNavigate} from 'react-router-dom';
import { handleApiError } from '../../utils/errors/handleApiError';
import { toast } from 'react-toastify';
import { userReducer, userInitialState } from '../../reducers/user/userReducer';
import { userRoleReducer, userRoleInitialState } from '../../reducers/roles/userRoleReducer';
import { IUserRole } from '../../types/access';
import { UserRoleActionsTypes } from '../../reducers/roles/userRoleTypes';
import { useLazyGetFilteredUsersQuery } from '../../store/api/userApi';
import { FormValidation, ValidateField } from '../../utils/validation/UserRoleValidation';
import { useDebounce } from './useDebounce.ts';
import { UserActionTypes } from '../../reducers/user/userTypes';

export const useUserRoles = () => {
  const  [userState, dispatchUser]  = useReducer(userReducer, userInitialState);
  const  [roleState, dispatchUserRole]  = useReducer(userRoleReducer, userRoleInitialState);
  const { role } = roleState;
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 700);
  const navigate = useNavigate();
  const location = useLocation();
  const [fetchUsers] = useLazyGetFilteredUsersQuery();
   
  const getUser = async () => {
    try {
      const data = await fetchUsers(debouncedQuery).unwrap();
        dispatchUser({ type: UserActionTypes.SET_USERS, payload: data });
    } catch (err: unknown) {
      handleApiError(err);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    if (debouncedQuery.length > 1) {
      params.set('search', debouncedQuery);
      navigate({
        pathname: location.pathname,
        search: params.toString(),
      }, { replace: true });
      getUser();
    } else {
      params.delete('search');
      navigate({ pathname: location.pathname, search: params.toString() }, { replace: true });
      dispatchUser({ type: UserActionTypes.SET_USERS, payload: []});
    }
  }, [debouncedQuery]);


  const handleInputChange = useCallback(
    <T extends string | IUserRole>(field: keyof IUserRole, value: T) => {
      setQuery(value as string);
      const validateErrors = ValidateField(field, value);
      dispatchUserRole({ 
        type: UserRoleActionsTypes.SET_ERROR, 
        payload: { [field]: validateErrors as string }
      });
      dispatchUserRole({ 
        type: UserRoleActionsTypes.SET_ROLE, 
        payload: { [field]: value as string }
      })
    },
    []
  );

  const handleAddUserRole = useCallback(async () => {
      try {
        const validateErrors = FormValidation(role);
        dispatchUserRole({
          type: UserRoleActionsTypes.SET_ERROR,
          payload: validateErrors as Record<string, string>
        })

        if (Object.values(validateErrors).length === 0) {
          if (!role) return;
          // const updateData = {
          //   ...role,
          // };
          // const data = await createUserRole(updateData).unwrap();
          // if (data) {
          //   toast(data?.message, { type: 'success' });
          // }
        }
      } catch (err) {
       handleApiError(err);
      }
    },[role]);
    
    const handleResetUserRole = () => {
      dispatchUserRole({ type: UserRoleActionsTypes.RESET_ROLE });
      dispatchUserRole({ type: UserRoleActionsTypes.RESET_ERROR });

    }
    
  return { 
    roleState,
    userState,
    actions: {
      handleInputChange,
      handleAddUserRole,
      handleResetUserRole
    }
  };
};
