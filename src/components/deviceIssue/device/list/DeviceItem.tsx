import { BaseDeviceQuery, Device } from '@/types/devices';
import { AssignedDevice } from '@/types/issue';

import styles from './DeviceItem.module.scss';

interface DeviceItemProps {
  actions: BaseDeviceQuery;
  devices: AssignedDevice[];
}

const DeviceItem = ({ actions, devices }: DeviceItemProps) => {
  return (
    <>
      {devices.map((item: AssignedDevice) => (
        <div className={styles.list} key={item.id} onClick={() => actions.handleSetDevice(item)}>
          <span className={styles.name}>
            {item.name} {item.inventoryNumber}
          </span>
          <span className={styles.email}>{item.serialNumber}</span>
        </div>
      ))}
    </>
  );
};

export default DeviceItem;
