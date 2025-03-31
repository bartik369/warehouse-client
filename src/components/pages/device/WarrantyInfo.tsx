import { FC } from "react";
import { Link } from "react-router-dom";
import { IAggregateDeviceInfo } from "../../../types/devices";
import {
  activeWarranty,
  contractor,
  endWarranty,
  notActiveWarranty,
  startWarranty,
  warranty,
  warrantyNumber,
} from "../../../utils/constants/constants";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { MdMiscellaneousServices } from "react-icons/md";
import styles from "./Device.module.scss";


interface IWarrantyInfoProps {
  device: IAggregateDeviceInfo;
}
const WarrantyInfo: FC<IWarrantyInfoProps> = ({ device }) => {
  return (
    <div className={styles.warranty}>
        <div className={styles.options}>
        <div className={styles.title}>
          <div className={styles.icon}>
            <MdMiscellaneousServices />
          </div>
          <span>{warranty}</span>
        </div>
       {device.warranty?.startWarrantyDate
       ? <>
       <div className={styles.block}>
        <div
          className={`${styles.status} ${
            !device.warranty?.isExpired ? styles.active : ""
          }`}
        >
          {device.warranty?.warrantyStatus === "active" ? (
            <div className={styles["status-icon"]}>
              <IoIosCheckmarkCircle />
              <span>{activeWarranty}</span>
            </div>
          ) : (
            notActiveWarranty
          )}
        </div>
        </div>

        <div className={styles.property}>
          <div className={styles.name}>{warrantyNumber}</div>
          <div className={styles.dots}></div>
          <div className={styles.value}>
          {device.warranty?.warrantyNumber}
          </div>
        </div>

        <div className={styles.property}>
          <div className={styles.name}>{contractor}</div>
          <div className={styles.dots}></div>
          <div className={styles.value}>
          <Link to="#">
              {device.warranty?.contractor?.name}
            </Link>
          </div>
        </div>

        <div className={styles.property}>
          <div className={styles.name}>{startWarranty}</div>
          <div className={styles.dots}></div>
          <div className={styles.value}>
          {device.warranty?.startWarrantyDate &&
              new Date(device.warranty?.startWarrantyDate).toLocaleDateString(
                "ru-RU"
              )}
          </div>
        </div>
        <div className={styles.property}>
          <div className={styles.name}>{endWarranty}</div>
          <div className={styles.dots}></div>
          <div className={styles.value}>
          {device.warranty?.endWarrantyDate &&
              new Date(device.warranty?.endWarrantyDate).toLocaleDateString(
                "ru-RU"
              )}
          </div>
        </div>
         </>
       : <div>Отсутствует</div>
       }


      </div>

    </div>
  );
};

export default WarrantyInfo;
