import {FC} from 'react';
import {Link} from 'react-router-dom';
import Input from '../../ui/input/Input';
import { useAuth } from '../../../hooks/data/useAuth';
import BtnAction from '../../ui/buttons/BtnAction';
import {enterDashboard, fillEmail, fillPassword, signin, forgetPassword, 
  reset, password, email } from '../../../utils/constants/constants';
import style from './AuthForm.module.scss';

const AuthForm: FC = () => {
    const {authData, errors, userHandler, authHandler} = useAuth();
    return (
      <div className={style.auth}>
        <div className={style.title}>{enterDashboard}</div>
        <form onSubmit={authHandler} >
          <Input
            onChange={userHandler}
            type="text"
            value={authData.email}
            placeholder={fillEmail}
            label={email}
            errors={errors}
            name="email"
          />
          <Input onChange={userHandler}
            type="password"
            value={authData.password}
            placeholder={fillPassword}
            label={password}
            errors={errors}
            name="password"
          />
          <BtnAction 
            title={signin} 
            size="lg"
            type="submit"
            color="blue"
          />
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