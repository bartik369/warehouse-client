import { BaseDeviceQuery, Device } from "@/types/devices";
import { RiDeleteBin4Line } from "react-icons/ri";
import styles from "./DeviceTable.module.scss";

interface DeviceTableRowProps {
  device: Device;
  actions: BaseDeviceQuery;
  showDeleteIcon?: boolean | null;
}

const DeviceTableRow = ({ device, actions, showDeleteIcon }: DeviceTableRowProps) => {
  return (
    <tr className={styles.row}>
      <td>{device.name}</td>
      <td>{device.modelName}</td>
      <td>{device.typeName}</td>
      <td>{device.manufacturerName}</td>
      <td>{device.inventoryNumber}</td>
      <td>{device.serialNumber}</td>
      {showDeleteIcon &&
      <td>
      <RiDeleteBin4Line 
        className={styles.icon}
        onClick={() => actions.handleDeleteDevice(device.id)}
     /></td>
      }

    </tr>
  );
};

export default DeviceTableRow;
