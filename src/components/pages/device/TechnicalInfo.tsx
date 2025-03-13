import {FC} from 'react';
import { IAggregateDeviceInfo } from '../../../types/devices';
import { BiArea } from "react-icons/bi";
import styles from './Device.module.scss'

interface ITechnicalInfoProps {
    device: IAggregateDeviceInfo;
}
const TechnicalInfo: FC<ITechnicalInfoProps> = ({device}) => {
    return (
        <div className={styles.options}>
            <div className={styles.title}>
                <div className={styles.icon}>
                <BiArea />
                </div>
                <span>Технические характеристики</span>
            </div>
            <div className={styles.property}>
              <div className={styles.name}>Название</div>
              <div className={styles.dots}></div>
              <div className={styles.value}>{device.name}</div>
            </div>
            {device.model.manufacturer.name && 
            <div className={styles.property}>
              <div className={styles.name}>Производитель</div>
              <div className={styles.dots}></div>
              <div className={styles.value}>{device.model.manufacturer.name}</div>
            </div>
            }
            {device.model && 
            <div className={styles.property}>
              <div className={styles.name}>Модель</div>
              <div className={styles.dots}></div>
              <div className={styles.value}>{device.model.name}</div>
            </div>
            }
            <div className={styles.property}>
                <div className={styles.name}>Код модели</div>
                <div className={styles.dots}></div>
                <div className={styles.value}>{device.modelCode} Дюйм</div>
              </div>
            {device.serialNumber && 
            <div className={styles.property}>
              <div className={styles.name}>Серийный номер</div>
              <div className={styles.dots}></div>
              <div className={styles.value}>{device.serialNumber}</div>
            </div>
            }
            {device.inventoryNumber && 
            <div className={styles.property}>
              <div className={styles.name}>Инвентарный номер</div>
              <div className={styles.dots}></div>
              <div className={styles.value}>{device.inventoryNumber}</div>
            </div>
            }  
            {device.memorySize && (
              <div className={styles.property}>
                <div className={styles.name}>Размер памяти</div>
                <div className={styles.dots}></div>
                <div className={styles.value}>{device.memorySize} Гб</div>
              </div>
            )}
             {device.screenSize && (
              <div className={styles.property}>
                <div className={styles.name}>Размер экрана</div>
                <div className={styles.dots}></div>
                <div className={styles.value}>{device.screenSize} Дюйм</div>
              </div>
            )}
            <div className={styles.property}>
                <div className={styles.name}>Локация</div>
                <div className={styles.dots}></div>
                <div className={styles.value}>{device.warehouse.name}</div>
            </div>
          </div>
    );
};

export default TechnicalInfo;