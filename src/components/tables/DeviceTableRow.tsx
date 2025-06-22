import { Device } from "../../types/devices";
import styles from "./DeviceTable.module.scss";

interface DeviceTableRowProps {
  device: Device;
}

const DeviceTableRow = ({ device }: DeviceTableRowProps) => {
  return (
    <tr className={styles.row}>
      <td>{device.name}</td>
      <td>{device.modelName}</td>
      <td>{device.typeName}</td>
      <td>{device.manufacturerName}</td>
      <td>{device.inventoryNumber}</td>
      <td>{device.serialNumber}</td>
    </tr>
  );
};

export default DeviceTableRow;
