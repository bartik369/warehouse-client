import { Device } from '@/types/devices';
import { AssignedDevice, BaseIssueQuery } from '@/types/issue';
import { prepareIssueDeviceData } from '@/utils/data/transformers';

import styles from './DeviceItem.module.scss';

interface DeviceItemProps {
  setDevice: (item: AssignedDevice) => void;
  devices: Device[];
}
const DeviceItem = ({ devices, setDevice }: DeviceItemProps) => {
  return (
    <>
      {devices.map((item: Device) => (
        <div
          className={styles.list}
          key={item.id}
          onClick={() => setDevice(prepareIssueDeviceData(item))}
        >
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
