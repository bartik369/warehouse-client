import { ChangeEvent, FC, useCallback, useState } from "react";
import DeviceItems from "./DeviceItems";
import Loader from "../../ui/loader/Loader";
import CheckboxFilter from "../../ui/checkbox/CheckboxFilter";
import { MdFilterListOff } from "react-icons/md";
import { FilterLabel } from "../../../types/devices";
import Pagination from "../../pagination/Pagination";
import { IFilteredDevicesFromBack } from "../../../types/devices";
import { extraOptions } from "../../../utils/constants/device";
import { useAppDispatch } from "../../../hooks/redux/useRedux";
import { setDeviceInfo} from "../../../store/slices/deviceSlice";
import { useDeviceFilters } from "../../../hooks/data/useDeviceFilters";
import { resetFilter } from "../../../utils/constants/constants";
import { manufacturersLabel, deviceTypeLabel, modelLabel, screenSizeLabel,
  memorySizeLabel, isFunctionalLabel, isAssignedLabel, warehouseLabel} from "../../../utils/constants/device";
import styles from "./Devices.module.scss";

const Devices: FC = () => {
  const {labels, devices, list, searchParams, page, setPage, handleResetFilter, 
    handleFilterChange,getUniqueOptions, setList, handlePrevPage,
    handleNextPage} = useDeviceFilters();
  const dispatch = useAppDispatch();
  const [checks, setChecks] = useState({})

  const handleCheck = useCallback((
    device: IFilteredDevicesFromBack,
    e: ChangeEvent<HTMLInputElement>) => {
    console.log(device)
    if (device && e.target) {
      const data = {
        device: {
          id: device.id,
          warehouse: {
            name:device.warehouse.name,
            slug:device.warehouse.slug,
          },
          isAssigned: device.isAssigned,
        },
        status: e.target.checked,
      }
      dispatch(setDeviceInfo(data));
    }
    setChecks({
      [device.id]:e.target.checked,
    })
  
  }, []);

  if (!devices) {
    return <Loader size='lg' color='grey' />;
  }
  
  //Fitler labels
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
    <>
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles["checkbox-column"]}>
            {[...searchParams.keys()]
            .filter(key => !['limit', 'page'].includes(key)).length > 0 && (
              <MdFilterListOff
              role='button'
              className={styles.reset}
              onClick={handleResetFilter}
              aria-label={resetFilter}
            />
            )}
            </th>
            {filterLabelsConfig.map(({key, label}, index) => 
            <th key={key}>
               <div className={styles.selectes}>
                {labels && labels[key].slice(0, 2).map((item, index) =>
                  <span key={`${key}-${index}`} className={styles.item}>{item}</span>
                )}
                  {labels && labels[key].length > 2 &&
                  <span key={`${key}-${index}`} className={styles.item2}>...</span>
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
            {extraOptions && extraOptions.map((option) => 
            <th key={option.id}>
              <div className={styles['extra-checkbox']}>
              <div className={styles.placeholder}>
                {option.label}
                </div>
              </div>
            </th>
            )}
          </tr>
        </thead>
        <tbody>
          <DeviceItems checks={checks} devices={devices.devices || []} handleCheck={handleCheck} />
        </tbody>
      </table>
    </div>
    <Pagination 
        page={page}
        totalPages={devices.totalPages || 0}
        disabled={{
          left: page === 1,
          right: page === devices?.totalPages
        }}
        prev={handlePrevPage} 
        next={handleNextPage}
        setPage={setPage}
      />
    </>
  );
};

export default Devices;
