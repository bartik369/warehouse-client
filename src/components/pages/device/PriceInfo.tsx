import {FC} from 'react';
import { IAggregateDeviceInfo } from '../../../types/devices';
import { financialOptions, priceWithVat, priceWithoutVat, 
  ruble } from '../../../utils/constants/constants';
import { PiMoneyWavyLight } from "react-icons/pi";
import styles from './Device.module.scss';

interface IPriceInfoProps {
    device: IAggregateDeviceInfo;
}
const PriceInfo: FC<IPriceInfoProps> = ({device}) => {
    return (
        <div className={styles.price}>
           <div className={styles.title}>
                <div className={styles.icon}>
                <PiMoneyWavyLight />
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

          </div>
    );
};

export default PriceInfo;