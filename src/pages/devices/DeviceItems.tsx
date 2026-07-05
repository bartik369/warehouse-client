import { ChangeEvent, memo } from 'react';

import { CgUnavailable } from 'react-icons/cg';
import { IoIosCloseCircle } from 'react-icons/io';
import { IoCheckmarkCircle } from 'react-icons/io5';
import { PiCheckCircleFill } from 'react-icons/pi';

import { FilteredDevicesFromBack } from '@/types/devices';

import styles from './Devices.module.scss';

interface DeviceItemsProps {
  devices: FilteredDevicesFromBack[];
  checks: Record<string, boolean>;
  handleCheck: (device: FilteredDevicesFromBack, e: ChangeEvent<HTMLInputElement>) => void;
}

const DeviceItems = memo(({ devices, checks, handleCheck }: DeviceItemsProps) => {
  return (
    <>
      {devices &&
        devices.map((device) => (
          <tr key={device.id} className={styles.row}>
            <td className={styles.checkboxColumn} onClick={(e) => e.stopPropagation()}>
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
            <td>{device.screenSize ? device.screenSize : '—'}</td>
            <td>{device.memorySize ? device.memorySize : '—'}</td>
            <td>
              {device.isFunctional ? (
                <div className={styles.serviceable}>
                  <PiCheckCircleFill />
                </div>
              ) : (
                <div className={styles.notServiceable}>
                  <IoIosCloseCircle />
                </div>
              )}
            </td>
            <td>
              {device.isAssigned ? (
                <div className={styles.inuse}>
                  <CgUnavailable />
                </div>
              ) : (
                <div className={styles.instock}>
                  <IoCheckmarkCircle />
                </div>
              )}
            </td>
            <td>{device.inventoryNumber ? device.inventoryNumber : '—'}</td>
            <td>{device.serialNumber ? device.serialNumber : '—'}</td>
          </tr>
        ))}
    </>
  );
});

export default DeviceItems;
