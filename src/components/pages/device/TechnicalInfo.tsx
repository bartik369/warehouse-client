import { AggregateDeviceInfo } from "@/types/devices";
import { BiArea } from "react-icons/bi";
import { IoIosCheckmarkCircle, IoIosCloseCircle } from "react-icons/io";
import { LABELS } from "@/utils/constants/ui/labels";
import { SECTION_TITLES } from "@/utils/constants/ui/titles";
import { UNIT_LABELS } from "@/utils/constants/ui/unit";
import styles from "./Device.module.scss";

interface TechnicalInfoProps {
  device: AggregateDeviceInfo;
}
const TechnicalInfo = ({ device }: TechnicalInfoProps) => {
  return (
    <div className={styles.options}>
      <div className={styles.title}>
        <div className={styles.icon}>
          <BiArea />
        </div>
        <span>{SECTION_TITLES.technicalOptions}</span>
      </div>
      <div className={styles.property}>
        <div className={styles.name}>{LABELS.name}</div>
        <div className={styles.dots}></div>
        <div className={styles.value}>{LABELS.name}</div>
      </div>
      {device.model.manufacturer.name && (
        <div className={styles.property}>
          <div className={styles.name}>{LABELS.manufacturer}</div>
          <div className={styles.dots}></div>
          <div className={styles.value}>{device.model.manufacturer.name}</div>
        </div>
      )}
      {device.model && (
        <div className={styles.property}>
          <div className={styles.name}>{LABELS.model}</div>
          <div className={styles.dots}></div>
          <div className={styles.value}>{device.model.name}</div>
        </div>
      )}
      <div className={styles.property}>
        <div className={styles.name}>{LABELS.modelCode}</div>
        <div className={styles.dots}></div>
        <div className={styles.value}>
          {device.modelCode} {UNIT_LABELS.inch}
        </div>
      </div>
      {device.serialNumber && (
        <div className={styles.property}>
          <div className={styles.name}>{LABELS.serialNumber}</div>
          <div className={styles.dots}></div>
          <div className={styles.value}>{device.serialNumber}</div>
        </div>
      )}
      {device.inventoryNumber && (
        <div className={styles.property}>
          <div className={styles.name}>{LABELS.inventoryNumber}</div>
          <div className={styles.dots}></div>
          <div className={styles.value}>{device.inventoryNumber}</div>
        </div>
      )}
      {device.memorySize && (
        <div className={styles.property}>
          <div className={styles.name}>{LABELS.memorySize}</div>
          <div className={styles.dots}></div>
          <div className={styles.value}>
            {device.memorySize} {UNIT_LABELS.gb}
          </div>
        </div>
      )}
      {device.screenSize && (
        <div className={styles.property}>
          <div className={styles.name}>{LABELS.screenSize}</div>
          <div className={styles.dots}></div>
          <div className={styles.value}>
            {device.screenSize} {UNIT_LABELS.inch}
          </div>
        </div>
      )}
      <div className={styles.property}>
        <div className={styles.name}>{LABELS.status}</div>
        <div className={styles.dots}></div>
        <div className={styles.value}>
          {device.isFunctional ? (
            <div className={`${styles.status} ${styles.available}`}>
              <IoIosCheckmarkCircle />
              <span>{LABELS.normally}</span>
            </div>
          ) : (
            <div className={`${styles.status} ${styles.unavailable}`}>
              <IoIosCloseCircle />
              <span>{LABELS.faulty}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TechnicalInfo;
