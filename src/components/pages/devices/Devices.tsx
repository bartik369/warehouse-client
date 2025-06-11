import { ChangeEvent, useCallback, useEffect, useState } from "react";
import DeviceItems from "./DeviceItems";
import Loader from "../../ui/loader/Loader";
import CheckboxFilter from "../../ui/checkbox/CheckboxFilter";
import Pagination from "../../pagination/Pagination";
import { IFilteredDevicesFromBack } from "../../../types/devices";
import { useAppDispatch } from "../../../hooks/redux/useRedux";
import { setDeviceInfo, resetDeviceInfo } from "../../../store/slices/deviceSlice";
import { useDeviceFilters } from "../../../hooks/data/useDeviceFilters";
import { resetFilter } from "../../../utils/constants/constants";
import { extraOptions, filterLabelsConfig } from "../../../utils/constants/device";
import { MdFilterListOff } from "react-icons/md";
import styles from "./Devices.module.scss";

const Devices = () => {
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

  useEffect(() => {
    return () => {
      dispatch(resetDeviceInfo());
    }
  }, [])

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
      setChecks((prev) => ({
        ...prev,
        [device.id]: e.target.checked,
      }));
    },
    [dispatch]
  );

  if (!devices) {
    return <Loader size="lg" color="grey" />;
  }

  return (
    <>
      <div className={styles.container}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.checkboxColumn}>
                {[...searchParams.keys()].filter(
                  (key) => !["limit", "page"].includes(key)).length > 0 && (
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
                    <div className={styles.extraCheckbox}>
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
