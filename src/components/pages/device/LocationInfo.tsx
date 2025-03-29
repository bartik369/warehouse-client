import { FC } from "react";
import { IAggregateDeviceInfo } from "../../../types/devices";
import { TbLocationCheck } from "react-icons/tb";

import styles from "./Device.module.scss";

interface ILocationInfoProps {
  device: IAggregateDeviceInfo;
}
const LocationInfo: FC<ILocationInfoProps> = ({ device }) => {
 console.log(device)
  return (
    <div className={styles.location}>
      <div className={styles.title}>
        <div className={styles.icon}>
          <TbLocationCheck />
        </div>
        <span>Локация</span>
      </div>
      <div className={styles.block}>
        <div className={styles.value}>{device.warehouse.name}</div>
      </div>
      <div className={styles.block}>
        <div className={styles.value}>
          {device.price_without_vat}
          <span>знач</span>
        </div>
        <div className={styles.name}>чот-то</div>
      </div>
    </div>
  );
};

export default LocationInfo;
