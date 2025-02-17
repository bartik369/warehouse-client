import {ChangeEvent, FC} from 'react';
import { useNavigate } from 'react-router-dom';
import { yes, no } from "../../../utils/constants/constants";
import { IFilteredDevicesFromBack } from '../../../types/devices';
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { CgUnavailable } from "react-icons/cg";
import { FcProcess } from "react-icons/fc";
import styles from "./Devices.module.scss";


interface IDeviceItemsProps {
    devices: IFilteredDevicesFromBack[];
    checks: Record<string, boolean>
    handleCheck:(device:IFilteredDevicesFromBack, e: ChangeEvent<HTMLInputElement>) => void;
}

const DeviceItems:FC<IDeviceItemsProps> = ({devices, checks, handleCheck}) => {
  const navigate = useNavigate();
    return (
        <>
          {devices && devices.map((device) => (
              <tr 
                key={device.id} 
                className={styles.row}
                onClick={() => navigate(`/devices/${device.id}`)}
              >
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
                    <span>{'Используется'}</span>
                  </div>
                  ) : (
                    <div className={styles.instock}>
                    <IoIosCheckmarkCircleOutline />
                    <span>{'На складе'}</span>
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