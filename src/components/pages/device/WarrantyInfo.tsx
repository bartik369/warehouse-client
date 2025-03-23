import { FC } from 'react';
import { IAggregateDeviceInfo } from '../../../types/devices';
import { activeWarranty, endWarranty, notActiveWarranty, startWarranty,
   warranty, warrantyNumber } from "../../../utils/constants/constants";
import { FiTool } from 'react-icons/fi';
import styles from './Device.module.scss';

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
                <span>{warranty}</span>
            </div>
      <div className={styles.block}>
        <div className={styles.value}>{device.warranty?.warrantyNumber}</div>
        <div className={styles.name}>{warrantyNumber}</div>
      </div>
      <div className={styles.block}>
        <div className={styles.value}>
          {device.warranty?.startWarrantyDate &&
            new Date(device.warranty?.startWarrantyDate).toLocaleDateString(
              "ru-RU"
            )}
        </div>
        <div className={styles.name}>{startWarranty}</div>
      </div>
      <div className={styles.block}>
        <div className={styles.value}>
          {device.warranty?.endWarrantyDate &&
            new Date(device.warranty?.endWarrantyDate).toLocaleDateString(
              "ru-RU"
            )}
        </div>
        <div className={styles.name}>{endWarranty}</div>
      </div>

      </div>
      <div className={`${styles.status} ${
          !device.warranty?.isExpired ? styles.active : ""
        }`}>
        {device.warranty?.warrantyStatus === "active" ? activeWarranty : notActiveWarranty}
      </div>

    </div>
  );
};

export default WarrantyInfo;
