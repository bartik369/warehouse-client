import { FC } from "react";
import { IAggregateDeviceInfo } from "../../../types/devices";
import { FiTool } from "react-icons/fi";
import styles from "./Device.module.scss";

interface IWarrantyInfoProps {
  device: IAggregateDeviceInfo;
}
const WarrantyInfo: FC<IWarrantyInfoProps> = ({ device }) => {
  return (
    <div className={styles.warranty}>
      <div className={styles.info}>
      <div className={styles.title}>
                <div className={styles.icon}>
                <FiTool />
                </div>
                <span>Гарантия</span>
            </div>
      <div className={styles.block}>
        <div className={styles.value}>{device.warranty?.warrantyNumber}</div>
        <div className={styles.name}>Номер гарантии</div>
      </div>
      <div className={styles.block}>
        <div className={styles.value}>
          {device.warranty?.startWarrantyDate &&
            new Date(device.warranty?.startWarrantyDate).toLocaleDateString(
              "ru-RU"
            )}
        </div>
        <div className={styles.name}>Начало гарантии</div>
      </div>
      <div className={styles.block}>
        <div className={styles.value}>
          {device.warranty?.endWarrantyDate &&
            new Date(device.warranty?.endWarrantyDate).toLocaleDateString(
              "ru-RU"
            )}
        </div>
        <div className={styles.name}>Конец гарантии</div>
      </div>

      </div>
      <div className={`${styles.status} ${
          !device.warranty?.isExpired ? styles.active : ""
        }`}>
        {device.warranty?.warrantyStatus === "active" ? "Активна" : "Неактивна"}
      </div>

    </div>
  );
};

export default WarrantyInfo;
