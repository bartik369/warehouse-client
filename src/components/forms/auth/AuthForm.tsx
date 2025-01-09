import React, {FC} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks/redux/useRedux';
import { setCredentials } from '../../../store/slices/authSlice';
import { useSigninMutation } from '../../../store/api/authApi';
import BtnAction from '../../ui/buttons/BtnAction';
import Input from '../../ui/input/Input';
import {enterDashboard, fillEmail, fillPassword, signin, forgetPassword, reset,
  password, email } from '../../../utils/constants/constants';
import { AuthValidate} from '../../../utils/validation/AuthValidate';
import { useAuth } from '../../../hooks/data/useAuth';
import { faEnvelope, faLock} from '@fortawesome/free-solid-svg-icons';
import style from './AuthForm.module.scss';

const AuthForm: FC = () => {
    const [signinUser] = useSigninMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {authData, errors, setErrors, userHandler} = useAuth();
    
    const authHandler = async (e:React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const validationErrors = AuthValidate(authData);
      setErrors(validationErrors);

      if (Object.keys(validationErrors).length === 0) {
        try {
          await signinUser(authData).unwrap().then((data) => {
            dispatch(setCredentials(data.user))
            localStorage.setItem('accessToken', data.token);
            navigate('/')  
          });
        } catch (error: unknown) {
  
          if (error instanceof Error) {
            console.log(error);
          }
        }
      } else {
      }
    };
    return (
      <div className={style.auth}>
        <div className={style.title}>{enterDashboard}</div>
        <form onSubmit={authHandler}>
          <Input
            onChange={userHandler}
            type="text"
            value={authData.email}
            placeholder={fillEmail}
            icon={faEnvelope}
            label={email}
            errors={errors}
            name='email'
          />
          <Input onChange={userHandler}
            type="password"
            value={authData.password}
            placeholder={fillPassword}
            icon={faLock}
            label={password}
            errors={errors}
            name='password'
          />
          <BtnAction title={signin} size='lg' type='submit' color='blue'/>
        </form>
        <div className={style.reset}>{forgetPassword}
          <Link to={import.meta.env.VITE_RESET_PASSWORD}>
            {reset}
          </Link>
        </div>
      </div>
    );
};

export default AuthForm;