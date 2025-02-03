import { FC} from "react";
import CheckboxFilter from "../../ui/checkbox/CheckboxFilter";
import { IFilteredDevicesFromBack } from "../../../types/devices";
import { manufacturersLabel, deviceTypeLabel, modelLabel, screenSizeLabel,
memorySizeLabel, isFunctionalLabel } from "../../../utils/constants/device";
import { useDeviceFilters } from "../../../hooks/data/useDeviceFilters";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import styles from "./Devices.module.scss";

const Devices: FC = () => {
  const { devices, handleFilterChange, getUniqueOptions } = useDeviceFilters();

  const handleCheck = () => {
    console.log('click');
    
  }

  return (
    <div className={styles['wrapper-tab']}>
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
          <th className={styles['checkbox-column']}>
          </th>
            <th>
              <CheckboxFilter
                name="manufacturer"
                label={manufacturersLabel}
                items={getUniqueOptions("manufacturer") || []}
                onChange={handleFilterChange}
              />
            </th>
            <th>
              <CheckboxFilter
                name="type"
                label={deviceTypeLabel}
                items={getUniqueOptions("type") || []}
                onChange={handleFilterChange}
              />
            </th>
            <th>
              <CheckboxFilter
                name="model"
                label={modelLabel}
                items={getUniqueOptions("model") || []}
                onChange={handleFilterChange}
              />
            </th>
            <th>
              <CheckboxFilter
                name="warehouse"
                label={'Склад'}
                items={getUniqueOptions("warehouse") || []}
                onChange={handleFilterChange}
              />
            </th>
            {777 && (
              <>
                <th>
                  <CheckboxFilter
                    name="screenSize"
                    label={screenSizeLabel}
                    items={getUniqueOptions("screenSize") || []}
                    onChange={handleFilterChange}
                  />
                </th>
                <th>
                  <CheckboxFilter
                    name="memorySize"
                    label={memorySizeLabel}
                    items={getUniqueOptions("memorySize") || []}
                    onChange={handleFilterChange}
                  />
                </th>
              </>
            )}
             <th>
                  <CheckboxFilter
                    name="isFunctional"
                    label={isFunctionalLabel}
                    items={getUniqueOptions("isFunctional") || []}
                    onChange={handleFilterChange}
                  />
                </th>
          </tr>
        </thead>
        <tbody>
          {devices && devices.map((device: IFilteredDevicesFromBack) => (
              <tr key={device.id} className={styles.deviceRow}>
                 <td className={styles['checkbox-column']}>
                 <label key={device.id} className={styles.checkbox}>
                  <input
                    type="checkbox"
                    id={device.id}
                    onChange={() => handleCheck()}
                  />
                <span className={styles.checkmark}/>

              </label>
                </td>
                <td>{device.model.manufacturer.name}</td>
                <td>{device.model.type.name}</td>
                <td>{device.model.name}</td>
                <td>{device.warehouse.name}</td>
                {777 && (
                  <>
                    <td>{device.screenSize}</td>
                    <td>{device.memorySize}</td>
                  </>
                )}
                <td>{device.isFunctional 
                ? <div className={styles.serviceable}>
                  <div className={styles.icon}>
                    <FontAwesomeIcon icon={faCheck}/>
                  </div>
                  <span>Да</span>
                 </div>
                : <div className={styles['not-serviceable']}>
                   <div className={styles.icon}>
                   <FontAwesomeIcon icon={faXmark}/>
                    </div>
                  <span>Нет</span>
                  </div>
                }</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default Devices;