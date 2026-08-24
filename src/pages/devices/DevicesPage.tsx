import { useEffect } from 'react';

import { FilteredDevicesFromBack } from '@/entities/device/model/types';
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

  const handleCheck = (rowsInfo: FilteredDevicesFromBack[]) => {
    console.log(rowsInfo);
    // todo  удалить после теста выдачи через список
    // const devices = rowsInfo.map((device) => ({
    //   id: device.id,
    //   name: device.name,
    //   modelName: device.name || '',
    //   modelType: device.model.type.name,
    //   manufacturer: device.model.manufacturer.name,
    //   inventoryNumber: device.inventoryNumber ?? '',
    //   serialNumber: device.serialNumber ?? '',
    //   isAssigned: device.isAssigned ?? false,
    //   warehouse: {
    //     id: device.warehouse.id,
    //     name: device.warehouse.name,
    //     slug: device.warehouse.slug,
    //     locationId: device.warehouse.locationId,
    //   },
    // }));
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
