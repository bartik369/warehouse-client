import { useEffect } from 'react';

import { Device } from '@/entities/device/model/types';
import OfficeFileBtn from '@/features/export-table-data/ui/OfficeFileBtn';
import { useAppDispatch } from '@/hooks/redux/useRedux';
import { resetDevice, resetStatus } from '@/store/slices/deviceSlice';
import { setSelectedDevice } from '@/store/slices/issueSlice';
import { useDeviceTableController } from '@/widgets/devices-table/model/useDeviceTableController';
import { DevicesTable } from '@/widgets/devices-table/ui/DevicesTable';

import styles from './Devices.module.scss';

const DevicesPage = () => {
  const {
    devices,
    options,
    filters,
    page,
    limit,
    totalCount,
    isLoading,
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

  const handleCheck = (rowsInfo: Device[]) => {
    dispatch(setSelectedDevice(rowsInfo));
  };

  return (
    <>
      <div className={styles.downloadFile}>
        <OfficeFileBtn stack={devices} />
      </div>
      <div className={styles.container}>
        <DevicesTable
          isLoading={isLoading}
          devices={devices}
          options={options ?? []}
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

export default DevicesPage;
