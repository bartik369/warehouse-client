import {Link} from 'react-router-dom';
import Input from '../../ui/input/Input';
import { useAuth } from '../../../hooks/data/useAuth';
import BtnAction from '../../ui/buttons/BtnAction';
import { GoLock } from "react-icons/go";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { BUTTON_LABELS } from '../../../utils/constants/ui/buttons';
import {enterDashboard, fillEmail, fillPassword, forgetPassword, 
  password, email } from '../../../utils/constants/constants';
import styles from './AuthForm.module.scss';

const AuthForm = () => {
    const {authData, errors, userHandler, authHandler} = useAuth();
    return (
      <div className={styles.auth}>
        <div className={styles.title}>{enterDashboard}</div>
        <form onSubmit={authHandler} >
          <Input
            onChange={userHandler}
            type="text"
            value={authData.email}
            placeholder={fillEmail}
            label={email}
            errors={errors}
            name="email"
            variant='auth'
            icon={<HiOutlineEnvelope />}
          />
          <Input onChange={userHandler}
            type="password"
            value={authData.password}
            placeholder={fillPassword}
            label={password}
            errors={errors}
            name="password"
            variant='auth'
            icon={<GoLock />}
          />
          <div className={styles.actions}>
          <BtnAction 
            title={BUTTON_LABELS.signin} 
            size="lg"
            click={authHandler}
            color="dark-grey"
          />
          </div>
        </form>
        <div className={styles.reset}>{forgetPassword}
          <Link to={import.meta.env.VITE_RESET_PASSWORD}>
            {BUTTON_LABELS.reset}
          </Link>
        </div>
      </div>
    );
};

export default AuthForm;