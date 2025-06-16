import { Link } from "react-router-dom";
import { AggregateDeviceInfo } from "../../../types/devices";
import { TbLocationCheck } from "react-icons/tb";
import { use, location } from "../../../utils/constants/constants";
import styles from "./Device.module.scss";

interface ILocationInfoProps {
  device: AggregateDeviceInfo;
}
const LocationInfo = ({ device }:ILocationInfoProps) => {
  return (
    <div className={styles.options}>
      <div className={styles.title}>
        <div className={styles.icon}>
          <TbLocationCheck />
        </div>
        <span>{ location }</span>
      </div>
      <div className={styles.item}>{device.warehouse.name}</div>
      <div className={styles.block}>
        {!device.isAssigned && (
          <div className={styles.property}>
            <div className={styles.name}>{use}</div>
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
