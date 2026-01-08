import { Device } from '@/types/devices';
import { BaseIssueQuery } from '@/types/issue';
import { prepareIssueDeviceData } from '@/utils/data/transformers';

import styles from './DeviceItem.module.scss';

interface DeviceItemProps {
  actions: BaseIssueQuery;
  devices: Device[];
}
const DeviceItem = ({ actions, devices }: DeviceItemProps) => {
  return (
    <>
      {devices.map((item: Device) => (
        <div
          className={styles.list}
          key={item.id}
          onClick={() => actions.handleSetDevice(prepareIssueDeviceData(item))}
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
