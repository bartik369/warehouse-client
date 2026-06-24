import { useCallback } from 'react';

import { useNavigate } from 'react-router-dom';

import { useSigninMutation } from '@/store/api/authApi';
import { setCredentials } from '@/store/slices/authSlice';
import { Signin } from '@/types/user';
import { handleApiError } from '@/utils/errors/handleApiError';

import { useAppDispatch } from '../redux/useRedux';

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
