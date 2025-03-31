import { FC } from "react";
import { IAggregateDeviceInfo } from "../../../types/devices";
import { TbLocationCheck } from "react-icons/tb";

import styles from "./Device.module.scss";
import { Link } from "react-router-dom";

interface ILocationInfoProps {
  device: IAggregateDeviceInfo;
}
const LocationInfo: FC<ILocationInfoProps> = ({ device }) => {
  console.log(device);
  return (
    <div className={styles.options}>
      <div className={styles.title}>
        <div className={styles.icon}>
          <TbLocationCheck />
        </div>
        <span>Локация</span>
      </div>
      <div className={styles.item}>{device.warehouse.name}</div>
      <div className={styles.block}>
        {!device.isAssigned && (
          <div className={styles.property}>
            <div className={styles.name}>Использует</div>
            <div className={styles.dots}></div>
            <div className={styles.value}>
              <Link to={"#"}>
                Иванов Иван
              </Link>
            </div>
          </div>
        )}
      </div>
      <div className={styles.separate}></div>
    </div>
  );
};

export default LocationInfo;
