import { useCallback } from 'react';

import { useNavigate } from 'react-router-dom';

import { Signin } from '@/shared/types/user';
import { handleApiError } from '@/shared/utils/errors/handleApiError';
import { useSigninMutation } from '@/store/api/authApi';
import { setCredentials } from '@/store/slices/authSlice';

import { useAppDispatch } from '../../../shared/hooks/useRedux';

export const useAuth = () => {
  const [signinUser] = useSigninMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const authHandler = useCallback(
    async (values: Signin) => {
      try {
        const data = await signinUser(values).unwrap();

        if (data) {
          dispatch(setCredentials(data.user));
          localStorage.setItem('hasAccessToken', 'true');
          navigate('/');
        }
      } catch (err) {
        handleApiError(err);
      }
    },
    [signinUser, dispatch, navigate]
  );

  return { authHandler };
};
