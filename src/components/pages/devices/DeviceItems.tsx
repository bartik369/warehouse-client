import {FC} from 'react';
import { yes, no } from "../../../utils/constants/constants";
import { IFilteredDevicesFromBack } from '../../../types/devices';
import styles from "./Devices.module.scss";


interface IDeviceItemsProps {
    devices: IFilteredDevicesFromBack[];
    handleCheck:(device:IFilteredDevicesFromBack) => void;
}

const DeviceItems:FC<IDeviceItemsProps> = ({devices, handleCheck}) => {
    return (
        <>
          {devices && devices.map((device) => (
              <tr key={device.id} className={styles.deviceRow}>
                <td className={styles["checkbox-column"]}>
                  <label key={device.id} className={styles.checkbox}>
                    <input
                      type="checkbox"
                      id={device.id}
                      onChange={() => handleCheck(device)}
                    />
                    <span className={styles.checkmark} />
                  </label>
                </td>
                <td>{device.model.manufacturer.name}</td>
                <td>{device.model.type.name}</td>
                <td>{device.model.name}</td>
                <td>{device.warehouse.name}</td>
                <td>{device.screenSize ? device.screenSize : "—"}</td>
                <td>{device.memorySize ? device.memorySize : "—"}</td>
                <td>
                  {device.isFunctional ? (
                    <div className={styles.serviceable}>{yes}</div>
                  ) : (
                    <div className={styles["not-serviceable"]}>{no}</div>
                  )}
                </td>
                <td>
                  {device.isAssigned ? (
                    <div className={styles.inuse}>Используется</div>
                  ) : (
                    <div className={styles.instock}>На складе</div>
                  )}
                </td>
                <td>{device.inventoryNumber ? device.inventoryNumber : "—"}</td>
                <td>{device.serialNumber ? device.serialNumber : "—"}</td>
              </tr>
            ))}
        </>
    );
};

export default DeviceItems;