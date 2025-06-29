import { ChangeEvent, useEffect, useState } from "react";
import DeviceItems from "./DeviceItems";
import Loader from "@/components/ui/loader/Loader";
import CheckboxFilter from "@/components/ui/checkbox/CheckboxFilter";
import Pagination from "@/components/pagination/Pagination";
import OfficeFileBtn from "@/components/ui/buttons/download/OfficeFileBtn";
import { FilteredDevicesFromBack } from "@/types/devices";
import { useAppDispatch } from "@/hooks/redux/useRedux";
import { resetDevice, patchDevice, setStatus, resetStatus } from "@/store/slices/deviceSlice";
import { useDeviceFilters } from "@/hooks/data/useDeviceFilters";
import { extraOptions, filterLabelsConfig } from "@/utils/constants/device";
import { ELEMENTS_LABELS } from "@/utils/constants/ui/elements";
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
      dispatch(resetDevice());
      dispatch(resetStatus());
    }
  }, []);
  
  const handleCheck = 
    (device: FilteredDevicesFromBack, e: ChangeEvent<HTMLInputElement>) => {
      if (device && e.target) {
        dispatch(
          patchDevice({
            id: device.id,
            warehouseName: device.warehouse.name,
            warehouseSlug: device.warehouse.slug,
            isAssigned: device.isAssigned,
          })
        );
      }
      dispatch(setStatus(e.target.checked));
      setChecks({
        [device.id]: e.target.checked
      });
    };

    // status: e.target.checked,

  if (!devices) return <Loader size="lg" color="grey" />;

  return (
    <>
    <div className={styles.downloadFile}>
      <OfficeFileBtn stack={devices?.devices || []} />
    </div>
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
                    aria-label={ELEMENTS_LABELS.resetFilter}
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
