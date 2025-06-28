import { AggregateDeviceInfo } from "../../../types/devices";
import { TbCoins } from "react-icons/tb";
import { LABELS } from "../../../utils/constants/ui/labels";
import { UNIT_LABELS } from "../../../utils/constants/ui/unit";
import styles from "./Device.module.scss";

interface PriceInfoProps {
  device: AggregateDeviceInfo;
}
const PriceInfo = ({ device }:PriceInfoProps) => {
  return (
    <div className={styles.price}>
      <div className={styles.title}>
      <div className={styles.icon}>
        <TbCoins />
      </div>
        <span>{LABELS.financialOptions}</span>
      </div>
      <div className={styles.block}>
        <div className={styles.value}>
          {device.price_with_vat}
          <span>{UNIT_LABELS.ruble}</span>
        </div>
        <div className={styles.name}>{LABELS.priceWithVat}</div>
      </div>
      <div className={styles.block}>
        <div className={styles.value}>
          {device.price_without_vat}
          <span>{UNIT_LABELS.ruble}</span>
        </div>
        <div className={styles.name}>{LABELS.priceWithoutVat}</div>
      </div>
      <div className={styles.separate}></div>
    </div>
  );
};

export default PriceInfo;
