import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSigninMutation } from '../../store/api/authApi';
import { setCredentials } from '../../store/slices/authSlice';
import { ISignin } from '../../types/user';
import { AuthValidate, AuthValidateField } from '../../utils/validation/AuthValidate';
import { useAppDispatch } from '../redux/useRedux';
import { handleApiError } from '../../utils/errors/handleApiError';

export const useAuth = () => {
    const [authData, setAuthData] = useState<ISignin>({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState<Partial<ISignin>>({});
    const [signinUser] = useSigninMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    
    const userHandler = useCallback((e:React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target as {name: keyof ISignin, value: string}
        setAuthData((prev) => ({
          ...prev,
          [name]: value
        }));
  
        const validationErrors = AuthValidateField(name);
        setErrors((prev) => ({
          ...prev,
          [name]: validationErrors
        }));
      }, []);

      const checkErrors = (validationErrors:Partial<ISignin>) =>  {
        return Object.values(validationErrors).every(item => !item)
      };

      const authHandler = async() => {
        const validationErrors = AuthValidate(authData);
        setErrors(validationErrors)
       
        if (checkErrors(validationErrors)) {
          try {
            await signinUser(authData).unwrap().then((data) => {
              dispatch(setCredentials(data.user));
              localStorage.setItem('accessToken', data.accessToken);
              navigate('/');
            });
          } catch (err) {
            handleApiError(err);
          }
        }
      };
      
      return {authData, errors, setErrors, setAuthData, userHandler, authHandler}
}
