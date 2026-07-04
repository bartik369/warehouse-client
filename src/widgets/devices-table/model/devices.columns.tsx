import { Button } from 'antd';
import { ColumnType } from 'antd/es/table';
import { CgUnavailable } from 'react-icons/cg';
import { FaCircleInfo } from 'react-icons/fa6';
import { IoIosCloseCircle } from 'react-icons/io';
import { IoCheckmarkCircle } from 'react-icons/io5';
import { PiCheckCircleFill } from 'react-icons/pi';

import { sortNumbers } from '@/shared/lib/export/sortNums';
import { FilterDropdown } from '@/shared/ui/filter-dropdown/FilterDropdown';
import {
  DeviceFilters,
  Entity,
  FilterDeviceOptions,
  FilteredDevicesFromBack,
} from '@/types/devices';

import styles from './Columns.module.scss';

export const getDevicesColumns = ({
  filters,
  options,
  onView,
  setFilters,
  resetSingleFilter,
}: {
  manufacturers: Entity[];
  warehouses: Entity[];
  types: Entity[];
  filters: DeviceFilters;
  options: FilterDeviceOptions;
  onView: (deviceId: string) => void;
  setFilters: React.Dispatch<React.SetStateAction<DeviceFilters>>;
  resetSingleFilter: (key: keyof DeviceFilters) => void;
}): ColumnType<FilteredDevicesFromBack>[] => {
  const manufacturerOptions =
    options.manufacturer?.map((m) => ({
      text: m.name,
      value: m.slug,
    })) || [];

  const typeOptions =
    options.type?.map((t) => ({
      text: t.name,
      value: t.slug,
    })) || [];

  const warehouseOptions =
    options.warehouse.map((w) => ({
      text: w.name,
      value: w.slug,
    })) || [];

  const screenSizeOptions =
    options.screenSize.map((s) => ({
      text: s.screenSize,
      value: s.screenSize,
    })) || [];

  const memorySizeOptions =
    options.memorySize.map((m) => ({
      text: m.memorySize,
      value: m.memorySize,
    })) || [];

  const functionalityOptions = [
    { text: 'Исправен', value: 'true' },
    { text: 'Неисправен', value: 'false' },
  ];
  const assignedOptions = [
    { text: 'В использовании', value: 'true' },
    { text: 'На складе', value: 'false' },
  ];

  const TABLE_TITLES = {
    manufacturer: 'Производитель',
    type: 'Тип',
    model: 'Модель',
    warehouse: 'Склад',
    screenSize: 'Размер экрана',
    memorySize: 'ОЗУ(Гб)',
    isFunctional: 'Исправность',
    isAssigned: 'Используется',
    inventoryNumber: 'Инвентарный номер',
    serialNumber: 'Серийный номер',
  };

  return [
    {
      key: 'manufacturer',
      title: TABLE_TITLES.manufacturer,
      dataIndex: ['model', 'manufacturer', 'name'],
      width: 220,
      align: 'center',
      sorter: (a, b) =>
        (a.model?.manufacturer?.name ?? '').localeCompare(b.model?.manufacturer?.name ?? ''),
      filteredValue: filters.manufacturer.length ? filters.manufacturer : null,
      filters: options.manufacturer?.map((manufacturer) => ({
        text: manufacturer.name,
        value: manufacturer.slug!,
      })),
      filterDropdown: (props) => (
        <FilterDropdown
          {...props}
          options={manufacturerOptions}
          filterKey="manufacturer"
          setFilters={setFilters}
          resetSingleFilter={resetSingleFilter}
        />
      ),
    },
    {
      key: 'type',
      title: TABLE_TITLES.type,
      dataIndex: ['model', 'type', 'name'],
      width: 220,
      align: 'center',
      sorter: (a, b) => (a.model?.type?.name || '').localeCompare(b.model?.type?.name),
      filteredValue: filters.type.length ? filters.type : null,
      filters: options.type?.map((type) => ({
        text: type.name,
        value: type.slug!,
      })),
      filterDropdown: (props) => (
        <FilterDropdown
          {...props}
          options={typeOptions}
          filterKey="type"
          setFilters={setFilters}
          resetSingleFilter={resetSingleFilter}
        />
      ),
    },
    {
      key: 'model',
      title: TABLE_TITLES.model,
      dataIndex: ['model', 'name'],
      width: 170,
      align: 'center',
      sorter: true,
    },
    {
      key: 'warehouse',
      title: TABLE_TITLES.warehouse,
      dataIndex: ['warehouse', 'name'],
      width: 200,
      align: 'center',
      sorter: (a, b) => (a.warehouse?.name || '').localeCompare(b.warehouse?.name || ''),
      filteredValue: filters.warehouse.length ? filters.warehouse : null,
      filters: options.warehouse?.map((warehouse) => ({
        text: warehouse.name,
        value: warehouse.slug!,
      })),
      filterDropdown: (props) => (
        <FilterDropdown
          {...props}
          options={warehouseOptions}
          filterKey="warehouse"
          setFilters={setFilters}
          resetSingleFilter={resetSingleFilter}
        />
      ),
    },
    {
      key: 'screenSize',
      title: TABLE_TITLES.screenSize,
      dataIndex: 'screenSize',
      width: 160,
      align: 'center',
      sorter: (a, b, sortNumber) => sortNumbers(a.screenSize, b.screenSize, sortNumber!),
      filteredValue: filters.screenSize.length ? filters.screenSize : null,
      filterDropdown: (props) => (
        <FilterDropdown
          {...props}
          options={screenSizeOptions}
          filterKey="screenSize"
          setFilters={setFilters}
          resetSingleFilter={resetSingleFilter}
        />
      ),
    },
    {
      key: 'memorySize',
      title: TABLE_TITLES.memorySize,
      dataIndex: 'memorySize',
      width: 160,
      align: 'center',
      sorter: (a, b, sortOrder) => sortNumbers(a.memorySize, b.memorySize, sortOrder),
      filteredValue: filters.memorySize.length ? filters.memorySize : null,
      filterDropdown: (props) => (
        <FilterDropdown
          {...props}
          options={memorySizeOptions}
          filterKey="memorySize"
          setFilters={setFilters}
          resetSingleFilter={resetSingleFilter}
        />
      ),
    },
    {
      key: 'isFunctional',
      title: TABLE_TITLES.isFunctional,
      dataIndex: 'isFunctional',
      width: 160,
      align: 'center',
      sorter: (a, b) => Number(a.isFunctional) - Number(b.isFunctional),
      filteredValue: filters.isFunctional.length ? filters.isFunctional : null,
      filterDropdown: (props) => (
        <FilterDropdown
          {...props}
          options={functionalityOptions}
          filterKey="isFunctional"
          setFilters={setFilters}
          resetSingleFilter={resetSingleFilter}
        />
      ),
      render: (isFunctional: boolean) => (
        <div className={styles.iconWrapper}>
          {isFunctional ? (
            <PiCheckCircleFill className={styles.serviceable} />
          ) : (
            <IoIosCloseCircle className={styles.notServiceable} />
          )}
        </div>
      ),
    },
    {
      key: 'isAssigned',
      title: TABLE_TITLES.isAssigned,
      dataIndex: 'isAssigned',
      width: 150,
      align: 'center',
      sorter: (a, b) => Number(a.isAssigned) - Number(b.isAssigned),
      filteredValue: filters.isAssigned.length ? filters.isAssigned : null,
      filterDropdown: (props) => (
        <FilterDropdown
          {...props}
          options={assignedOptions}
          filterKey="isAssigned"
          setFilters={setFilters}
          resetSingleFilter={resetSingleFilter}
        />
      ),
      render: (isAssigned: boolean) => (
        <div className={styles.iconWrapper}>
          {isAssigned ? (
            <CgUnavailable className={styles.inUse} />
          ) : (
            <IoCheckmarkCircle className={styles.inStock} />
          )}
        </div>
      ),
    },
    {
      key: 'inventoryNumber',
      title: TABLE_TITLES.inventoryNumber,
      dataIndex: 'inventoryNumber',
      width: 200,
      align: 'center',
      sorter: true,
    },
    {
      key: 'serialNumber',
      title: TABLE_TITLES.serialNumber,
      dataIndex: 'serialNumber',
      width: 220,
      align: 'center',
      sorter: true,
    },
    {
      key: 'actions',
      title: '',
      fixed: 'right',
      width: 60,
      align: 'center',
      render: (_, record: FilteredDevicesFromBack) => (
        <Button
          className={styles.infoButton}
          type="link"
          icon={<FaCircleInfo />}
          onClick={() => onView?.(record.id)}
          title="Информация"
        />
      ),
    },
  ];
};
