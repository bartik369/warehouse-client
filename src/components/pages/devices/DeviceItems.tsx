import {ChangeEvent, FC} from 'react';
import { yes, no, inStock, inUse } from "../../../utils/constants/constants";
import { IFilteredDevicesFromBack } from '../../../types/devices';
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { CgUnavailable } from "react-icons/cg";
import styles from "./Devices.module.scss";

interface IDeviceItemsProps {
    devices: IFilteredDevicesFromBack[];
    checks: Record<string, boolean>
    handleCheck:(device:IFilteredDevicesFromBack, e: ChangeEvent<HTMLInputElement>) => void;
}

const DeviceItems:FC<IDeviceItemsProps> = ({devices, checks, handleCheck}) => {
    return (
        <>
          {devices && devices.map((device) => (
              <tr key={device.id} className={styles.row}>
                <td className={styles["checkbox-column"]} 
                  onClick={(e) => e.stopPropagation()}>
                  <label key={device.id} className={styles.checkbox}>
                    <input
                      checked={checks[device.id] || false}
                      type="checkbox"
                      id={device.id}
                      onChange={(e) => handleCheck(device, e)}
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
                    <div className={styles.serviceable}>
                      <IoIosCheckmarkCircleOutline />
                      <span>{yes}</span>
                    </div>
                  ) : (
                    <div className={styles["not-serviceable"]}>
                      <IoIosCloseCircleOutline />
                      <span>{no}</span>
                    </div>
                  )}
                </td>
                <td>
                  {device.isAssigned ? (
                    <div className={styles.inuse}>
                    <CgUnavailable/>
                    <span>{inUse}</span>
                  </div>
                  ) : (
                    <div className={styles.instock}>
                    <IoIosCheckmarkCircleOutline />
                    <span>{inStock}</span>
                  </div>
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