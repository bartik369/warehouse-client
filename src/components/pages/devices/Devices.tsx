import { FC } from "react";
import DeviceItems from "./DeviceItems";
import CheckboxFilter from "../../ui/checkbox/CheckboxFilter";
import { FilterLabel } from "../../../types/devices";
import { IFilteredDevicesFromBack } from "../../../types/devices";
import { MdFilterListOff } from "react-icons/md";
import { manufacturersLabel, deviceTypeLabel, modelLabel, screenSizeLabel,
  memorySizeLabel, isFunctionalLabel, isAssignedLabel, warehouseLabel} from "../../../utils/constants/device";
import { useDeviceFilters } from "../../../hooks/data/useDeviceFilters";
import styles from "./Devices.module.scss";

const Devices: FC = () => {
  const {labels, devices, list, searchParams, filters, handleResetFilter, handleFilterChange,
    getUniqueOptions, setList} = useDeviceFilters();

  const handleCheck = (device: IFilteredDevicesFromBack) => {
    console.log(device);
  };

  if (!devices) {
    return <div>загрузка</div>;
  }

  const filterLabelsConfig: FilterLabel[] = [
    {key: 'manufacturer', label: manufacturersLabel},
    {key: 'type', label: deviceTypeLabel},
    {key: 'model', label: modelLabel},
    {key: 'warehouse', label: warehouseLabel},
    {key: 'screenSize', label: screenSizeLabel},
    {key: 'memorySize', label: memorySizeLabel},
    {key: 'isFunctional', label: isFunctionalLabel},
    {key: 'isAssigned', label: isAssignedLabel},
  ]

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles["checkbox-column"]}>
            {[...searchParams.keys()].length > 0 && (
              <MdFilterListOff
              className={styles.reset}
              onClick={handleResetFilter} 
            />
            )}
            </th>
            {filterLabelsConfig.map(({key, label}) => 
            <th key={key}>
               <div className={styles.selectes}>
                {labels && labels[key].slice(0, 2).map((item) =>
                  <span className={styles.item}>{item}</span>
                )}
                  {labels && labels[key].length > 2 &&
                  <span className={styles.item2}>...</span>
                }
              </div>
              <CheckboxFilter
                name={key}
                label={label}
                items={getUniqueOptions(key) || []}
                onChange={handleFilterChange}
                list={list} 
                setList={setList}
              />
            </th>
            )}
          </tr>
        </thead>
        <tbody>
          <DeviceItems devices={devices || []} handleCheck={handleCheck} />
        </tbody>
      </table>
    </div>
  );
};

export default Devices;
