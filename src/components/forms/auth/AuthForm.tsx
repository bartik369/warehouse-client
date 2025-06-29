import {Link} from 'react-router-dom';
import Input from '@/components/ui/input/Input';
import { useAuth } from '@/hooks/data/useAuth';
import BtnAction from '@/components/ui/buttons/BtnAction';
import { GoLock } from "react-icons/go";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { BUTTON_LABELS } from '@/utils/constants/ui/buttons';
import { LABELS } from '@/utils/constants/ui/labels';
import { PLACEHOLDER_LABELS } from '@/utils/constants/ui/placeholders';
import { MESSAGES } from '@/utils/constants/ui/messages';
import styles from './AuthForm.module.scss';

const AuthForm = () => {
    const {authData, errors, userHandler, authHandler} = useAuth();
    return (
      <div className={styles.auth}>
        <div className={styles.title}>{MESSAGES.enterDashboard}</div>
        <form onSubmit={authHandler} >
          <Input
            onChange={userHandler}
            type="text"
            value={authData.email}
            placeholder={PLACEHOLDER_LABELS.fillEmail}
            label={LABELS.email}
            errors={errors}
            name="email"
            variant='auth'
            icon={<HiOutlineEnvelope />}
          />
          <Input onChange={userHandler}
            type="password"
            value={authData.password}
            placeholder={PLACEHOLDER_LABELS.fillPassword}
            label={LABELS.password}
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
        <div className={styles.reset}>{MESSAGES.forgetPassword}
          <Link to={import.meta.env.VITE_RESET_PASSWORD}>
            {BUTTON_LABELS.reset}
          </Link>
        </div>
      </div>
    );
};

export default AuthForm;