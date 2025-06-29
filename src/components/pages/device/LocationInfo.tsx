import { Link } from "react-router-dom";
import { AggregateDeviceInfo } from "@/types/devices";
import { TbLocationCheck } from "react-icons/tb";
import { LABELS } from "@/utils/constants/ui/labels";
import styles from "./Device.module.scss";

interface LocationInfoProps {
  device: AggregateDeviceInfo;
}
const LocationInfo = ({ device }:LocationInfoProps) => {
  return (
    <div className={styles.options}>
      <div className={styles.title}>
        <div className={styles.icon}>
          <TbLocationCheck />
        </div>
        <span>{ LABELS.location }</span>
      </div>
      <div className={styles.item}>{device.warehouse.name}</div>
      <div className={styles.block}>
        {!device.isAssigned && (
          <div className={styles.property}>
            <div className={styles.name}>{LABELS.use}</div>
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
