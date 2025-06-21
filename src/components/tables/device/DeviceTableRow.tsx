import { BaseDeviceQuery, Device } from "../../../types/devices";
import styles from "./DeviceTable.module.scss";
import { RiDeleteBin4Line } from "react-icons/ri";

interface DeviceTableRowProps {
  device: Device;
  actions: BaseDeviceQuery;
}

const DeviceTableRow = ({ device, actions }: DeviceTableRowProps) => {
  return (
    <tr className={styles.row}>
      <td>{device.name}</td>
      <td>{device.modelName}</td>
      <td>{device.typeName}</td>
      <td>{device.manufacturerName}</td>
      <td>{device.inventoryNumber}</td>
      <td>{device.serialNumber}</td>
      <td>
        <RiDeleteBin4Line
          className={styles.icon}
          onClick={() => actions.handleDeleteDevice(device.id)}
        />
      </td>
    </tr>
  );
};

export default DeviceTableRow;
