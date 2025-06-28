import { AggregateDeviceInfo } from "../../../types/devices";
import { RiFileUserLine } from "react-icons/ri";
import { LABELS } from "../../../utils/constants/ui/labels";
import styles from "./Device.module.scss";

interface UserInfoProps {
  device: AggregateDeviceInfo;
}
const UserInfo = ({ device }:UserInfoProps) => {
  return (
      <div className={styles.options}>
        <div className={styles.title}>
          <div className={styles.icon}>
            <RiFileUserLine />
          </div>
          <span>{LABELS.whoAdded}</span>
        </div>
        <div className={styles.property}>
          <div className={styles.name}>{LABELS.addedBy}</div>
          <div className={styles.dots}></div>
          <div className={styles.value}>
            {device.addedBy.firstNameRu} {device.addedBy.lastNameRu}
          </div>
        </div>
        <div className={styles.property}>
          <div className={styles.name}>{LABELS.updatedBy}</div>
          <div className={styles.dots}></div>
          <div className={styles.value}>
            {device.updatedBy.firstNameRu} {device.updatedBy.lastNameRu}
          </div>
        </div>
        <div className={styles.property}>
          <div className={styles.name}>{LABELS.wasAdded}</div>
          <div className={styles.dots}></div>
          <div className={styles.value}>
            {device.createdAt &&
              new Date(device.createdAt).toLocaleString("ru-RU")}
          </div>
        </div>
      <div className={styles.property}>
        <div className={styles.name}>{LABELS.wasUpdated}</div>
        <div className={styles.dots}></div>
        <div className={styles.value}>
          {device.updatedAt &&
            new Date(device.updatedAt).toLocaleString("ru-RU")}
        </div>
      </div>
      </div>

  );
};

export default UserInfo;
