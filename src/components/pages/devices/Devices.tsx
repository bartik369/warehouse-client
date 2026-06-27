import { useEffect } from 'react';

import OfficeFileBtn from '@/features/export-table-data/ui/OfficeFileBtn';
import { setAssignedDevice, setIssueStep } from '@/features/issue/model/issueSlice';
import { useDeviceTableController } from '@/hooks/data/useDeviceTableController';
import { useAppDispatch } from '@/hooks/redux/useRedux';
import Loader from '@/shared/ui/loader/Loader';
import { resetDevice, resetStatus } from '@/store/slices/deviceSlice';
import { FilteredDevicesFromBack } from '@/types/devices';
import { DevicesTable } from '@/widgets/devices-table/ui/DevicesTable';

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
    const devices = rowsInfo.map((device) => ({
      id: device.id,
      name: device.name,
      modelName: device.name || '',
      modelType: device.model.type.name,
      manufacturer: device.model.manufacturer.name,
      inventoryNumber: device.inventoryNumber ?? '',
      serialNumber: device.serialNumber ?? '',
    }));
    dispatch(setAssignedDevice(devices));
    dispatch(setIssueStep(1));
  };

  if (!devices || !options) return <Loader size="lg" color="orange" />;

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
