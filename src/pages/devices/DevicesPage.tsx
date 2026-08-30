import { useEffect, useMemo } from 'react';

import { Button, Flex, Popover, Typography } from 'antd';
import { BiFilterAlt } from 'react-icons/bi';
import { IoAdd } from 'react-icons/io5';
import { TbFilterCog } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

import { Device } from '@/entities/device/model/types';
import { ExportFile } from '@/features/export-file/ui/ExportFile';
import { useDeviceFilters } from '@/features/filter-devices/model/useDeviceFilter';
import { activeFiltersCount } from '@/features/filter-devices/model/utils';
import { FiltersContent } from '@/features/filter-devices/ui/content/FiltersContent';
import { DeviceFilters } from '@/features/filter-devices/ui/filter/DeviceFilters';
import { useAppDispatch } from '@/hooks/redux/useRedux';
import Search from '@/shared/ui/search/Search';
import { StartProcessButton } from '@/shared/ui/start-process-button/StartProcessButton';
import { resetDevice, resetStatus } from '@/store/slices/deviceSlice';
import { setSelectedDevice } from '@/store/slices/issueSlice';
import { useDeviceTableController } from '@/widgets/devices-table/model/useDeviceTableController';
import { DevicesTable } from '@/widgets/devices-table/ui/DevicesTable';

import styles from './DevicesPage.module.scss';

const DevicesPage = () => {
  const {
    devices,
    page,
    limit,
    totalCount,
    isLoading,
    setPage,
    handleTableChange,
    resetSingleFilter,
  } = useDeviceTableController();
  const {
    filters,
    citiesOptions,
    warehousesOptions,
    statusesOptions,
    availableOptions,
    manufacturersOptions,
    typesOptions,
    handleWarehouseChange,
    handleStatusChange,
    handleAssignedChange,
    handleTypeChange,
    handleManufacturerChange,
    handleDisplaySize,
    handleMemorySize,
  } = useDeviceFilters();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const filtersCount = useMemo(() => activeFiltersCount(filters), [filters]);

  useEffect(() => {
    return () => {
      dispatch(resetDevice());
      dispatch(resetStatus());
    };
  }, []);

  const handleCheck = (rowsInfo: Device[]) => {
    dispatch(setSelectedDevice(rowsInfo));
  };
  const handleChange = (value: string) => {
    console.log(value);
  };

  return (
    <Flex vertical>
      <Flex className={styles.header}>
        <Flex justify="space-between">
          <Flex vertical>
            <Typography.Title className={styles.title} level={1}>
              Устройства
            </Typography.Title>
            <span className={styles.description}>Реестр всех устройств в выбраном городе</span>
          </Flex>
          <StartProcessButton
            title="Добавить устройство"
            onClick={() => navigate('/admin')}
            icon={IoAdd}
          />
        </Flex>
        <Flex justify="space-between" gap={20}>
          <DeviceFilters
            filters={filters}
            citiesOptions={citiesOptions}
            statusesOptions={statusesOptions}
            warehousesOptions={warehousesOptions}
            handleWarehouseChange={handleWarehouseChange}
            handleStatusChange={handleStatusChange}
          />
          <Search
            placeholder="Поиск по инвентарному и серийному номерам"
            value=""
            onChange={handleChange}
          />
          <Popover
            trigger="click"
            placement="bottomLeft"
            content={
              <FiltersContent
                filters={filters}
                manufacturersOptions={manufacturersOptions}
                availableOptions={availableOptions}
                typesOptions={typesOptions}
                handleAssignedChange={handleAssignedChange}
                handleDisplaySize={handleDisplaySize}
                handleMemorySize={handleMemorySize}
                handleTypeChange={handleTypeChange}
                handleManufacturerChange={handleManufacturerChange}
              />
            }
          >
            <Button
              className={styles.filterBtn}
              icon={<TbFilterCog className={styles.icon} size={16} />}
            >
              Фильтры <div className={styles.count}>{filtersCount}</div>
            </Button>
          </Popover>
          <ExportFile stack={devices} />
        </Flex>
      </Flex>

      <DevicesTable
        isLoading={isLoading}
        devices={devices}
        page={page}
        limit={limit}
        totalCount={totalCount}
        setPage={setPage}
        setDevices={handleCheck}
        onTableChange={handleTableChange}
        resetSingleFilter={resetSingleFilter}
      />
    </Flex>
  );
};

export default DevicesPage;
