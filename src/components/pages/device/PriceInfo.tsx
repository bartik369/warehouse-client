import {FC} from 'react';
import { IAggregateDeviceInfo } from '../../../types/devices';
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
                <span>Финансовая часть</span>
            </div>
          <div className={styles.block}>
                <div className={styles.value}>
                  {device.price_with_vat}
                  <span>руб.</span>
                </div>
                <div className={styles.name}>Цена с НДС</div>
          </div>
          <div className={styles.block}>
                <div className={styles.value}>
                  {device.price_without_vat}
                  <span>руб.</span>
                </div>
                <div className={styles.name}>Цена без НДС</div>
          </div>

          </div>
    );
};

export default PriceInfo;