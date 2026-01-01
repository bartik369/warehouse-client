import { useEffect } from 'react';
import Loader from '@/components/ui/loader/Loader';
import DevicesTable from '@/features/devices/ui/DevicesTable';
import OfficeFileBtn from '@/components/ui/buttons/download/OfficeFileBtn';
import { FilteredDevicesFromBack } from '@/types/devices';
import { useAppDispatch } from '@/hooks/redux/useRedux';
import { resetDevice, resetStatus, setSelectedDevices } from '@/store/slices/deviceSlice';
import { useDeviceTableController } from '@/hooks/data/useDeviceTableController';
import styles from './Devices.module.scss';

const Devices = () => {
  const {
    devices,
    options,
    filters,
    page,
    limit,
    totalCount,
    setPage,
    handleTableChange,
    resetSingleFilter,
  } = useDeviceTableController();
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetDevice());
      dispatch(resetStatus());
    };
  }, []);

  const handleCheck = (rowsInfo: FilteredDevicesFromBack[]) => {
    dispatch(setSelectedDevices(rowsInfo));
  };

  if (!devices || !options) return <Loader size="lg" color="green" />;

  return (
    <>
      <div className={styles.downloadFile}>
        <OfficeFileBtn stack={devices?.devices || []} />
      </div>
      <div className={styles.container}>
        <DevicesTable
          devices={devices?.devices}
          options={options}
          filters={filters}
          page={page}
          limit={limit}
          totalCount={totalCount}
          setPage={setPage}
          setDevices={handleCheck}
          onTableChange={handleTableChange}
          resetSingleFilter={resetSingleFilter}
        />
      </div>
    </>
  );
};

export default Devices;
