import { useCallback, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../../types/user';
import { handleApiError } from '../../utils/errors/handleApiError';
import { useCreateUserMutation } from '../../store/api/userApi';
import { UserActionTypes } from '../../reducers/user/userTypes';
import { FormValidation, ValidateField } from '../../utils/validation/UserValidation';
import { userReducer, userInitialState } from '../../reducers/user/userReducer';
import { toast } from 'react-toastify';

export const useUser = () => {
  const  [state, dispatch] = useReducer(userReducer, userInitialState)
  const { user, checked } = state;
  const [createUser] = useCreateUserMutation();
  const navigate = useNavigate();

  const handleInputChange = useCallback(
    <T extends string | User>(field: keyof User, value: T) => {
      const validateErrors = ValidateField(field, value);
      dispatch({ 
        type: UserActionTypes.SET_ERROR, 
        payload: { [field]: validateErrors as string }
      });
      dispatch({ 
        type: UserActionTypes.SET_USER, 
        payload: { [field]: value as string }
      })
    },
    []
  );

  const handleGetUser = (id: string) => {
    navigate(`/users/${id}`)
  }
  
  const handleCreateUser = useCallback(async () => {
      try {
        const validateErrors = FormValidation(user);
        dispatch({
          type: UserActionTypes.SET_ERROR,
          payload: validateErrors as Record<string, string>
        })

        if (Object.values(validateErrors).length === 0) {
          if (!user) return;
          const updateData = {
            ...user,
          };
          const data = await createUser(updateData).unwrap();
          if (data) {
            toast(data?.message, { type: 'success' });
          }
        }
      } catch (err) {
       handleApiError(err);
      }
    },[user]);
    
    const handleResetUser = () => {
      dispatch({ type: UserActionTypes.RESET_USER });
      dispatch({ type: UserActionTypes.RESET_ERROR });

    }

    const handleChecked = useCallback(() => {
      dispatch({ type: UserActionTypes.SET_CHECKED, payload: !checked});
      dispatch({ type: UserActionTypes.SET_USER, payload: { isActive: !checked }})
    }, [checked]);
    
  return { 
    state,
    actions: {
      handleChecked, 
      handleInputChange, 
      handleCreateUser, 
      handleResetUser, 
      handleGetUser 
    }
  };
};
