import { RiDeleteBin4Line } from 'react-icons/ri';

import { BaseDeviceQuery, Device } from '@/types/devices';
import { AssignedDevice } from '@/types/issue';

import styles from './DeviceTable.module.scss';

interface DeviceTableRowProps {
  device: AssignedDevice;
  actions: BaseDeviceQuery;
  showDeleteIcon?: boolean | null;
}

const DeviceTableRow = ({ device, actions, showDeleteIcon }: DeviceTableRowProps) => {
  return (
    <tr className={styles.row}>
      <td>{device.name}</td>
      <td>{device.modelName}</td>
      <td>{device.modelType}</td>
      <td>{device.manufacturer}</td>
      <td>{device.inventoryNumber}</td>
      <td>{device.serialNumber}</td>
      {showDeleteIcon && (
        <td>
          <RiDeleteBin4Line
            className={styles.icon}
            onClick={() => actions.handleDeleteDevice(device.id)}
          />
        </td>
      )}
    </tr>
  );
};

export default DeviceTableRow;
