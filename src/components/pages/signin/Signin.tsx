import AuthForm from "../../forms/auth/AuthForm";
import pic from "../../../assets/elements/pic.jpg";
import styles from "./Signin.module.scss";

const Signin = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <AuthForm />
        </div>
        <div className={styles.right}>
          <img src={pic} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Signin;
