import React, {useState, FC} from 'react';
import { Link } from 'react-router-dom';
import { ISignin } from '../../../types/user';
import { useSigninMutation } from '../../../store/api/authApi';
import BtnAction from '../../ui/buttons/BtnAction';
import Input from '../../ui/input/Input';
import {enterDashboard, fillEmail, fillPassword, signin, forgetPassword, reset,
  password, email } from '../../../utils/constants/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock} from '@fortawesome/free-solid-svg-icons';
import style from './AuthForm.module.scss';

const AuthForm: FC = () => {
    const [authData, setAuthData] = useState<ISignin>({
        email: '',
        password: ''
    });
    const [signinUser] = useSigninMutation();
    
    const authHandler = async (e:React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const data = await signinUser(authData);
        console.log(data)
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.log(error);
        }
      }
    };

    return (
      <div className={style.auth}>
        <div className={style.title}>{enterDashboard}</div>
        <form onSubmit={authHandler}>
          <Input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setAuthData({
                ...authData,
                email: e.target.value,
              })
            }
            type="text"
            value={authData.email}
            placeholder={fillEmail}
            icon={<FontAwesomeIcon icon={faEnvelope} />}
            label={email}
          />
          <Input onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setAuthData({
                ...authData,
                password: e.target.value,
              })
            }
            type="password"
            value={authData.password}
            placeholder={fillPassword}
            icon={<FontAwesomeIcon icon={faLock} />}
            label={password}
          />
          <BtnAction title={signin}/>
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