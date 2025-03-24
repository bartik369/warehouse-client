import { ChangeEvent, FC, useCallback, useState } from "react";
import DeviceItems from "./DeviceItems";
import Loader from "../../ui/loader/Loader";
import CheckboxFilter from "../../ui/checkbox/CheckboxFilter";
import Pagination from "../../pagination/Pagination";
import { IFilteredDevicesFromBack, FilterLabel } from "../../../types/devices";
import { useAppDispatch } from "../../../hooks/redux/useRedux";
import { setDeviceInfo } from "../../../store/slices/deviceSlice";
import { useDeviceFilters } from "../../../hooks/data/useDeviceFilters";
import { resetFilter } from "../../../utils/constants/constants";
import {
  manufacturersLabel,
  deviceTypeLabel,
  modelLabel,
  screenSizeLabel,
  memorySizeLabel,
  isFunctionalLabel,
  isAssignedLabel,
  warehouseLabel,
  extraOptions,
} from "../../../utils/constants/device";
import { MdFilterListOff } from "react-icons/md";
import { CgOptions } from "react-icons/cg";
import styles from "./Devices.module.scss";

const Devices: FC = () => {
  const {
    labels,
    devices,
    list,
    searchParams,
    page,
    setPage,
    handleResetFilter,
    handleFilterChange,
    getUniqueOptions,
    setList,
    handlePrevPage,
    handleNextPage,
  } = useDeviceFilters();
  const dispatch = useAppDispatch();
  const [checks, setChecks] = useState({});

  const handleCheck = useCallback(
    (device: IFilteredDevicesFromBack, e: ChangeEvent<HTMLInputElement>) => {
      if (device && e.target) {
        dispatch(
          setDeviceInfo({
            device: {
              id: device.id,
              warehouse: {
                name: device.warehouse.name,
                slug: device.warehouse.slug,
              },
              isAssigned: device.isAssigned,
            },
            status: e.target.checked,
          })
        );
      }
      setChecks({
        [device.id]: e.target.checked,
      });
    },
    [dispatch]
  );

  if (!devices) {
    return <Loader size="lg" color="grey" />;
  }

  // Fitler labels
  const filterLabelsConfig: FilterLabel[] = [
    { key: "manufacturer", label: manufacturersLabel },
    { key: "type", label: deviceTypeLabel },
    { key: "model", label: modelLabel },
    { key: "warehouse", label: warehouseLabel },
    { key: "screenSize", label: screenSizeLabel },
    { key: "memorySize", label: memorySizeLabel },
    { key: "isFunctional", label: isFunctionalLabel },
    { key: "isAssigned", label: isAssignedLabel },
  ];

  return (
    <>
      <div className={styles.container}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles["checkbox-column"]}>
                {[...searchParams.keys()].filter(
                  (key) => !["limit", "page"].includes(key)
                ).length > 0 && (
                  <MdFilterListOff
                    role="button"
                    className={styles.reset}
                    onClick={handleResetFilter}
                    aria-label={resetFilter}
                  />
                )}
              </th>
              {filterLabelsConfig.map(({ key, label }) => (
                <th key={key}>
                  <CheckboxFilter
                    name={key}
                    label={label}
                    items={getUniqueOptions(key) || []}
                    onChange={handleFilterChange}
                    list={list}
                    setList={setList}
                  />
                  {labels[key].length > 0 && (
                    <div className={styles.selects}>{labels[key].length}</div>
                  )}
                </th>
              ))}
              {extraOptions &&
                extraOptions.map((option) => (
                  <th key={option.id}>
                    <div className={styles["extra-checkbox"]}>
                      <div className={styles.placeholder}>{option.label}</div>
                    </div>
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            <DeviceItems
              checks={checks}
              devices={devices.devices || []}
              handleCheck={handleCheck}
            />
          </tbody>
        </table>
      </div>
      <Pagination
        page={page}
        totalPages={devices.totalPages || 0}
        disabled={{
          left: page === 1,
          right: page === devices?.totalPages,
        }}
        prev={handlePrevPage}
        next={handleNextPage}
        setPage={setPage}
      />
    </>
  );
};

export default Devices;
