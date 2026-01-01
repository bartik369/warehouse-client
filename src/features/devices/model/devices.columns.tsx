import { InfoCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { ColumnType } from 'antd/es/table';
import { CgUnavailable } from 'react-icons/cg';
import { IoIosCloseCircle } from 'react-icons/io';
import { IoCheckmarkCircle } from 'react-icons/io5';
import { PiCheckCircleFill } from 'react-icons/pi';

import {
  DeviceFilters,
  Entity,
  FilterDeviceOptions,
  FilteredDevicesFromBack,
} from '@/types/devices';

import styles from './Columns.module.scss';
import { FilterDropdownContent } from '@/shared/ui/filterDropdown/FilterDropdownContent';
import { sortNumbers } from '@/utils/data/sortNums';

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

  return [
    {
      key: 'manufacturer',
      title: 'Производитель',
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
        <FilterDropdownContent
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
      title: 'Тип',
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
        <FilterDropdownContent
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
      title: 'Модель',
      dataIndex: ['model', 'name'],
      width: 170,
      align: 'center',
      sorter: true,
    },
    {
      key: 'warehouse',
      title: 'Склад',
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
        <FilterDropdownContent
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
      title: 'Размер экрана',
      dataIndex: 'screenSize',
      width: 160,
      align: 'center',
      sorter: (a, b, sortNumber) => sortNumbers(a.screenSize, b.screenSize, sortNumber!),
      filteredValue: filters.screenSize.length ? filters.screenSize : null,
      filterDropdown: (props) => (
        <FilterDropdownContent
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
      title: 'Размер ОЗУ',
      dataIndex: 'memorySize',
      width: 160,
      align: 'center',
      sorter: (a, b, sortOrder) => sortNumbers(a.memorySize, b.memorySize, sortOrder),
      filteredValue: filters.memorySize.length ? filters.memorySize : null,
      filterDropdown: (props) => (
        <FilterDropdownContent
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
      title: 'Исправность',
      dataIndex: 'isFunctional',
      width: 160,
      align: 'center',
      sorter: true,
      filteredValue: filters.isFunctional.length ? filters.isFunctional : null,
      filters: [
        { text: 'Исправен', value: 'true' },
        { text: 'Неисправен', value: 'false' },
      ],
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
      title: 'Доступно',
      dataIndex: 'isAssigned',
      width: 130,
      align: 'center',
      sorter: true,
      filteredValue: filters.isAssigned.length ? filters.isAssigned : null,
      filters: [
        { text: 'В использовании', value: 'true' },
        { text: 'На складе', value: 'false' },
      ],
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
      title: 'Инвентарный номер',
      dataIndex: 'inventoryNumber',
      width: 200,
      align: 'center',
      sorter: true,
    },
    {
      key: 'serialNumber',
      title: 'Серийный номер',
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
          icon={<InfoCircleOutlined />}
          onClick={() => onView?.(record.id)}
          title="Редактировать"
        />
      ),
    },
  ];
};
