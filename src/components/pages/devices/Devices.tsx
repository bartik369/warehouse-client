import { FC} from "react";
import { IFilters } from "../../../types/devices";
import Checkbox from "../../ui/checkbox/Checkbox";
import styles from "./Devices.module.scss";
import { useDeviceFilters } from "../../../hooks/data/useDeviceFilters";

const Devices: FC = () => {
  const { devices, handleFilterChange, getUniqueOptions } =
    useDeviceFilters();

  return (
    <div className={styles.devicesContainer}>
      <table className={styles.devicesTable}>
        <thead>
          <tr>
            <th>
              <Checkbox
                name="manufacturer"
                label={"Производитель"}
                items={getUniqueOptions("manufacturer") || []}
                onChange={handleFilterChange}
              />
            </th>
            <th>
              <Checkbox
                name="type"
                label={"Тип"}
                items={getUniqueOptions("type") || []}
                onChange={handleFilterChange}
              />
            </th>
            <th>
              <Checkbox
                name="model"
                label={"Модель"}
                items={getUniqueOptions("model") || []}
                onChange={handleFilterChange}
              />
            </th>
            {777 && (
              <>
                <th>
                  <Checkbox
                    name="screenSize"
                    label={"Размер экрана"}
                    items={getUniqueOptions("screenSize") || []}
                    onChange={handleFilterChange}
                  />
                </th>
                <th>
                  <Checkbox
                    name="memorySize"
                    label={"Размер памяти"}
                    items={getUniqueOptions("memorySize") || []}
                    onChange={handleFilterChange}
                  />
                </th>
                <th>
                  <Checkbox
                    name="isFunctional"
                    label={"Исправно"}
                    items={getUniqueOptions("isFunctional") || []}
                    onChange={handleFilterChange}
                  />
                </th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {devices && devices.map((device: IFilters) => (
              <tr key={device.id} className={styles.deviceRow}>
                <td>{device.model.manufacturer.name}</td>
                <td>{device.model.type.name}</td>
                <td>{device.model.name}</td>
                {777 && (
                  <>
                    <td>{device.screenSize}</td>
                    <td>{device.memorySize}</td>
                  </>
                )}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Devices;