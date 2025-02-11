import { FC } from "react";
import DeviceItems from "./DeviceItems";
import CheckboxFilter from "../../ui/checkbox/CheckboxFilter";
import { IFilteredDevicesFromBack } from "../../../types/devices";
import { MdFilterListOff } from "react-icons/md";
import { manufacturersLabel, deviceTypeLabel, modelLabel, screenSizeLabel,
  memorySizeLabel, isFunctionalLabel} from "../../../utils/constants/device";
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
            <th>
              <div className={styles.selectes}>
                {labels && labels['manufacturer'].slice(0, 2).map((item) =>
                  <span className={styles.item}>{item}</span>
                )}
                  {labels && labels['manufacturer'].length > 2 &&
                  <span className={styles.item2}>...</span>
                }
              </div>
              <CheckboxFilter
                name="manufacturer"
                label={manufacturersLabel}
                items={getUniqueOptions("manufacturer") || []}
                onChange={handleFilterChange}
                list={list} 
                setList={setList}
               
              />
            </th>
            <th>
            <div className={styles.selectes}>
                {labels && labels['type'].slice(0, 2).map((item) =>
                  <span className={styles.item}>{item}</span>
                )}
                 {labels && labels['type'].length > 2 &&
                  <span className={styles.item2}>...</span>
                }
              </div>
              <CheckboxFilter
                name="type"
                label={deviceTypeLabel}
                items={getUniqueOptions("type") || []}
                onChange={handleFilterChange}
                list={list} 
                setList={setList}
               
              />
            </th>
            <th>
            <div className={styles.selectes}>
                {labels && labels['model'].slice(0, 2).map((item) =>
                  <span className={styles.item}>{item}</span>
                )}
                  {labels && labels['model'].length > 2 &&
                  <span className={styles.item2}>...</span>
                }
              </div>
              <CheckboxFilter
                name="model"
                label={modelLabel}
                items={getUniqueOptions("model") || []}
                onChange={handleFilterChange}
                list={list} 
                setList={setList}
               
              />
            </th>
            <th>
            <div className={styles.selectes}>
                {labels && labels['warehouse'].slice(0, 1).map((item) =>
                  <span className={styles.item}>{item}</span>
                )}
                  {labels && labels['warehouse'].length > 1 &&
                  <span className={styles.item2}>...</span>
                }
              </div>
              <CheckboxFilter
                name="warehouse"
                label={"Склад"}
                items={getUniqueOptions("warehouse") || []}
                onChange={handleFilterChange}
                list={list} 
                setList={setList}
                
              />
            </th>
            <th>
            <div className={styles.selectes}>
                {labels && labels['screenSize'].slice(0, 4).map((item) =>
                  <span className={styles.item}>{item}</span>
                )}
                  {labels && labels['screenSize'].length > 4 &&
                  <span className={styles.item2}>...</span>
                }
              </div>
              <CheckboxFilter
                name="screenSize"
                label={screenSizeLabel}
                items={getUniqueOptions("screenSize") || []}
                onChange={handleFilterChange}
                list={list} 
                setList={setList}
               
              />
            </th>
            <th>
            <div className={styles.selectes}>
                {labels && labels['memorySize'].slice(0, 4).map((item) =>
                  <span className={styles.item}>{item}</span>
                )}
                  {labels && labels['memorySize'].length > 4 &&
                  <span className={styles.item2}>...</span>
                }
              </div>
              <CheckboxFilter
                name="memorySize"
                label={memorySizeLabel}
                items={getUniqueOptions("memorySize") || []}
                onChange={handleFilterChange}
                list={list} 
                setList={setList}
               
              />
            </th>
            <th>
            <div className={styles.selectes}>
                {labels && labels['isFunctional'].slice(0, 2).map((item) =>
                  <span className={styles.item}>{item}</span>
                )}
              </div>
              <CheckboxFilter
                name="isFunctional"
                label={isFunctionalLabel}
                items={getUniqueOptions("isFunctional") || []}
                onChange={handleFilterChange}
                list={list} 
                setList={setList}
                
              />
            </th>
            <th>
            <div className={styles.selectes}>
                {labels && labels['isAssigned'].slice(0, 2).map((item) =>
                  <span className={styles.item}>{item}</span>
                )}
              </div>
              <CheckboxFilter
                name="isAssigned"
                label={"Доступность"}
                items={getUniqueOptions("isAssigned") || []}
                onChange={handleFilterChange}
                list={list} 
                setList={setList}
               
              />
            </th>
            <th>
              <div className={styles["column-title"]}> Инвентарный номер</div>
            </th>
            <th>
              <div className={styles["column-title"]}>Серийный номер</div>
            </th>
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
