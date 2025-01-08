import React, {useState, FC} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ISignin } from '../../../types/user';
import { useAppDispatch } from '../../../hooks/redux/useRedux';
import { setAuth, setCredentials } from '../../../store/slices/authSlice';
import { useSigninMutation } from '../../../store/api/authApi';
import BtnAction from '../../ui/buttons/BtnAction';
import Input from '../../ui/input/Input';
import {enterDashboard, fillEmail, fillPassword, signin, forgetPassword, reset,
  password, email } from '../../../utils/constants/constants';
import { AuthValidate } from '../../../utils/validation/AuthValidate';
import { faEnvelope, faLock} from '@fortawesome/free-solid-svg-icons';
import style from './AuthForm.module.scss';

const AuthForm: FC = () => {
    const [authData, setAuthData] = useState<ISignin>({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [signinUser] = useSigninMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    
    const authHandler = async (e:React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const validationErrors = AuthValidate(authData);
        setErrors(validationErrors);
        // await signinUser(authData).unwrap().then((data) => {
        //   dispatch(setCredentials(data.user))
        //   localStorage.setItem('accessToken', data.token);
        //   navigate('/')  
        // });
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.log(error);
        }
      }
    };
    const userHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
      const {name, value} = e.target;
      setAuthData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
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