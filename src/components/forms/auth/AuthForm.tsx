import {Link} from 'react-router-dom';
import Input from '../../ui/input/Input';
import { useAuth } from '../../../hooks/data/useAuth';
import BtnAction from '../../ui/buttons/BtnAction';
import {enterDashboard, fillEmail, fillPassword, signin, forgetPassword, 
  reset, password, email } from '../../../utils/constants/constants';
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
          />
          <Input onChange={userHandler}
            type="password"
            value={authData.password}
            placeholder={fillPassword}
            label={password}
            errors={errors}
            name="password"
            variant='auth'
          />
          <div className={styles.actions}>
          <BtnAction 
            title={signin} 
            size="lg"
            click={authHandler}
            color="dark-grey"
          />
          </div>
        </form>
        <div className={styles.reset}>{forgetPassword}
          <Link to={import.meta.env.VITE_RESET_PASSWORD}>
            {reset}
          </Link>
        </div>
      </div>
    );
};

export default AuthForm;