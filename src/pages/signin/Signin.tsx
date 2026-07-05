import pic from '@/assets/elements/side-img.png';
import AuthForm from '@/features/auth/login-form/ui/AuthForm';

import styles from './Signin.module.scss';

const Signin = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <img src={pic} alt="" />
      </div>
      <div className={styles.right}>
        <div className={styles.form}>
          <AuthForm />
        </div>
      </div>
    </div>
  );
};

export default Signin;
