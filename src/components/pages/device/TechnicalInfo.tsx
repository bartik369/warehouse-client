import { FC } from 'react';
import { IAggregateDeviceInfo } from '../../../types/devices';
import { name, technicalOptions, inch, gb } from '../../../utils/constants/constants';
import { BiArea } from 'react-icons/bi';
import { inventoryNumber, location, manufacturersLabel, memorySizeLabel, 
  modelCode, modelLabel, screenSizeLabel, serialNumber} from '../../../utils/constants/device';
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
                <span>{technicalOptions}</span>
            </div>
            <div className={styles.property}>
              <div className={styles.name}>{name}</div>
              <div className={styles.dots}></div>
              <div className={styles.value}>{device.name}</div>
            </div>
            {device.model.manufacturer.name && 
            <div className={styles.property}>
              <div className={styles.name}>{manufacturersLabel}</div>
              <div className={styles.dots}></div>
              <div className={styles.value}>{device.model.manufacturer.name}</div>
            </div>
            }
            {device.model && 
            <div className={styles.property}>
              <div className={styles.name}>{modelLabel}</div>
              <div className={styles.dots}></div>
              <div className={styles.value}>{device.model.name}</div>
            </div>
            }
            <div className={styles.property}>
                <div className={styles.name}>{modelCode}</div>
                <div className={styles.dots}></div>
                <div className={styles.value}>{device.modelCode} {inch}</div>
              </div>
            {device.serialNumber && 
            <div className={styles.property}>
              <div className={styles.name}>{serialNumber}</div>
              <div className={styles.dots}></div>
              <div className={styles.value}>{device.serialNumber}</div>
            </div>
            }
            {device.inventoryNumber && 
            <div className={styles.property}>
              <div className={styles.name}>{inventoryNumber}</div>
              <div className={styles.dots}></div>
              <div className={styles.value}>{device.inventoryNumber}</div>
            </div>
            }  
            {device.memorySize && (
              <div className={styles.property}>
                <div className={styles.name}>{memorySizeLabel}</div>
                <div className={styles.dots}></div>
                <div className={styles.value}>{device.memorySize} {gb}</div>
              </div>
            )}
             {device.screenSize && (
              <div className={styles.property}>
                <div className={styles.name}>{screenSizeLabel}</div>
                <div className={styles.dots}></div>
                <div className={styles.value}>{device.screenSize} {inch}</div>
              </div>
            )}
            <div className={styles.property}>
                <div className={styles.name}>{location}</div>
                <div className={styles.dots}></div>
                <div className={styles.value}>{device.warehouse.name}</div>
            </div>
          </div>
    );
};

export default TechnicalInfo;