import { RiHome9Line } from 'react-icons/ri';

import errorNotification from '@/assets/elements/error-notification.png';
import { ActionButton } from '@/shared/ui/action-button/ActionButton';

import styles from './Fallback.module.scss';

const GlobalFallback = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.info}>
        <img src={errorNotification} alt="error" />
        <ActionButton
          title="На главную"
          variant="apply"
          icon={RiHome9Line}
          onClick={() => (window.location.href = '/')}
        />
      </div>
    </div>
  );
};

export default GlobalFallback;
