import ru_RU from 'antd/es/locale/ru_RU';
import { useGetManufacturersQuery } from '@/store/api/manufacturersApi';
import { useGetTypesQuery } from '@/store/api/typesApi';
import { useGetWarehousesQuery } from '@/store/api/warehousesApi';
import { DeviceFilters, FilterDeviceOptions, FilteredDevicesFromBack } from '@/types/devices';
import { ConfigProvider, Table } from 'antd';
import {
  FilterValue,
  SorterResult,
  TablePaginationConfig,
  TableRowSelection,
} from 'antd/es/table/interface';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDevicesColumns } from '../model/devices.columns';
import { useDeviceFilters } from '@/hooks/data/useDeviceFilters';
import styles from './DeviceTable.module.css';

interface DeviceTableProps {
  devices: FilteredDevicesFromBack[];
  options: FilterDeviceOptions;
  filters: DeviceFilters;
  page: number;
  limit: number;
  totalCount: number;
  setDevices: (devices: FilteredDevicesFromBack[]) => void;
  resetSingleFilter: (key: keyof DeviceFilters) => void;
  setPage: (page: number) => void;
  onTableChange: (
    _pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    _sorter: SorterResult<FilteredDevicesFromBack>[] | SorterResult<FilteredDevicesFromBack>
  ) => void;
}

const DevicesTable = ({
  devices,
  options,
  filters,
  page,
  limit,
  totalCount,
  setPage,
  setDevices,
  onTableChange,
  resetSingleFilter,
}: DeviceTableProps) => {
  const [selectedWarehouseSlug, setSelectedWarehouseSlug] = useState<string | null>(null);
  const { data: manufacturers = [] } = useGetManufacturersQuery();
  const { data: warehouses = [] } = useGetWarehousesQuery();
  const { data: types = [] } = useGetTypesQuery();
  const navigate = useNavigate();
  const { setFilters } = useDeviceFilters();

  const handleDeviceInfo = (deviceId: string) => {
    navigate(`/devices/${deviceId}`);
  };

  const columns = getDevicesColumns({
    manufacturers: manufacturers,
    warehouses: warehouses,
    types: types,
    filters: filters,
    options: options,
    onView: handleDeviceInfo,
    setFilters: setFilters,
    resetSingleFilter: resetSingleFilter,
  });

  const customLocale = {
    ...ru_RU,
    Pagination: {
      ...ru_RU.Pagination,
      items_per_page: '',
    },
  };

  const calculateTableWidth = () => {
    const totalWidth = columns.reduce((sum, col) => {
      return sum + (Number(col.width) || 100);
    }, 0);
    return totalWidth;
  };

  const rowSelection: TableRowSelection<FilteredDevicesFromBack> = {
    type: 'checkbox',
    onChange: (selectedRowKeys, selectedRows) => {
      setDevices(selectedRows);
      if (selectedRowKeys.length === 0) {
        setSelectedWarehouseSlug(null);
      } else {
        setSelectedWarehouseSlug(selectedRows[0].warehouse.slug);
      }
    },
    getCheckboxProps: (record) => ({
      disabled: selectedWarehouseSlug !== null && record.warehouse.slug !== selectedWarehouseSlug,
    }),
  };

  const DeviceTable = (
    <Table
      rowKey="id"
      size="small"
      bordered={false}
      columns={columns}
      dataSource={devices}
      rowSelection={rowSelection}
      rowClassName={(_, index) => (index % 2 !== 0 ? styles.evenRow : styles.oddRow)}
      scroll={{ x: calculateTableWidth() }}
      onChange={onTableChange}
      pagination={{
        pageSize: limit,
        current: page,
        total: totalCount,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '50', '100'],
        showTotal: (total, range) => `${range[0]}-${range[1]} из ${total} записей`,
      }}
    />
  );

  return (
    <div className={styles.customPagination}>
      <ConfigProvider locale={customLocale}>{DeviceTable}</ConfigProvider>
    </div>
  );
};

export default DevicesTable;
