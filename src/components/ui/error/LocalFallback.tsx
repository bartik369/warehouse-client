import errorNotification from "@/assets/elements/error-notification.png";
import { MESSAGES } from "@/utils/constants/ui/messages";
import styles from "./Fallback.module.scss";

const GlobalFallback = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.info}>
        <h1>{MESSAGES.errorFixing}</h1>
        <img src={errorNotification} alt="error" />
      </div>
    </div>
  );
};

export default GlobalFallback;
