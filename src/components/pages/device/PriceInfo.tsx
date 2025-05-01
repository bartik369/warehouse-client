import { IAggregateDeviceInfo } from "../../../types/devices";
import {
  financialOptions,
  priceWithVat,
  priceWithoutVat,
  ruble,
} from "../../../utils/constants/constants";
import { TbCoins } from "react-icons/tb";
import styles from "./Device.module.scss";

interface IPriceInfoProps {
  device: IAggregateDeviceInfo;
}
const PriceInfo = ({ device }:IPriceInfoProps) => {
  return (
    <div className={styles.price}>
      <div className={styles.title}>
      <div className={styles.icon}>
        <TbCoins />
      </div>
        <span>{financialOptions}</span>
      </div>
      <div className={styles.block}>
        <div className={styles.value}>
          {device.price_with_vat}
          <span>{ruble}</span>
        </div>
        <div className={styles.name}>{priceWithVat}</div>
      </div>
      <div className={styles.block}>
        <div className={styles.value}>
          {device.price_without_vat}
          <span>{ruble}</span>
        </div>
        <div className={styles.name}>{priceWithoutVat}</div>
      </div>
      <div className={styles.separate}></div>
    </div>
  );
};

export default PriceInfo;
