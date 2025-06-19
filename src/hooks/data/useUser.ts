import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../../types/user';
import { useAppDispatch, useAppSelector } from '../redux/useRedux';
import { RootState } from '../../store/store';
import { handleApiError } from '../../utils/errors/handleApiError';
import { useCreateUserMutation } from '../../store/api/userApi';
import { FormValidation, ValidateField } from '../../utils/validation/UserValidation';
import { setError, resetError, updateUser, setChecked, resetUser } from '../../store/slices/userSlice';
import { toast } from 'react-toastify';

export const useUser = () => {
  const [createUser] = useCreateUserMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state:RootState) => state.user.user);
  const currentChecked = useAppSelector((state:RootState) => state.user.checked);

  const handleInputChange = useCallback(
    <T extends string | User>(field: keyof User, value: T) => {
      const validateErrors = ValidateField(field, value);
      dispatch(setError({ [field]: validateErrors as string} ));
      dispatch(updateUser({field: field, value: value as string}));
    },
    []
  );

  const handleGetUser = (id: string) => {
    navigate(`/users/${id}`)
  }
  
  const handleCreateUser = useCallback(async () => {
      try {
        const validateErrors = FormValidation(currentUser);
        dispatch(setError(validateErrors as Record<string, string>));
      
        if (Object.values(validateErrors).length === 0) {
          if (!currentUser) return;
          const updateData = {
            ...currentUser,
          };
          const data = await createUser(updateData).unwrap();
          if (data) {
            toast(data?.message, { type: 'success' });
          }
        }
      } catch (err) {
       handleApiError(err);
      }
    },[currentUser]);
    
    const handleResetUser = () => {
      dispatch(resetUser());
      dispatch(resetError());
    }

    const handleChecked = useCallback(() => {
      dispatch(setChecked(!currentChecked));
      dispatch(updateUser({field: 'isActive', value: !currentChecked}));
    }, [currentChecked, dispatch]);
    
  return {
    actions: {
      handleChecked, 
      handleInputChange, 
      handleCreateUser, 
      handleResetUser, 
      handleGetUser 
    }
  };
};
