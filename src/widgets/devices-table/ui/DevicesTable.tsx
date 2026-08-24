import { useState } from 'react';

import { ConfigProvider, Table } from 'antd';
import {
  FilterValue,
  SorterResult,
  TablePaginationConfig,
  TableRowSelection,
} from 'antd/es/table/interface';
import { useNavigate } from 'react-router-dom';

import { FilteredDevicesFromBack } from '@/entities/device/model/types';
import { useDeviceFilters } from '@/hooks/data/useDeviceFilters';
import { antdLocale } from '@/shared/config/antd-locale';
import tableStyles from '@/shared/ui/table/table.module.scss';
import { useGetManufacturersQuery } from '@/store/api/manufacturersApi';
import { useGetTypesQuery } from '@/store/api/typesApi';
import { useGetWarehousesQuery } from '@/store/api/warehousesApi';
import { DeviceFilters, FilterDeviceOptions } from '@/types/devices';

import { getDevicesColumns } from '../model/devices.columns';

interface DeviceTableProps {
  devices: FilteredDevicesFromBack[];
  options: FilterDeviceOptions;
  filters: DeviceFilters;
  page: number;
  limit: number;
  totalCount: number;
  isLoading: boolean;
  setDevices: (devices: FilteredDevicesFromBack[]) => void;
  resetSingleFilter: (key: keyof DeviceFilters) => void;
  setPage: (page: number) => void;
  onTableChange: (
    _pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    _sorter: SorterResult<FilteredDevicesFromBack>[] | SorterResult<FilteredDevicesFromBack>
  ) => void;
}

export const DevicesTable = ({
  devices,
  options,
  filters,
  page,
  limit,
  totalCount,
  isLoading,
  setPage,
  setDevices,
  onTableChange,
  resetSingleFilter,
}: DeviceTableProps) => {
  const [selectedWarehouseSlug, setSelectedWarehouseSlug] = useState<string | null>(null);
  const [selectedDeviceStatus, setSelectedDeviceStatus] = useState<boolean | null>(null);
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
        setSelectedDeviceStatus(null);
      } else {
        setSelectedWarehouseSlug(selectedRows[0].warehouse.slug);
        setSelectedDeviceStatus(selectedRows[0].isAssigned);
      }
    },
    getCheckboxProps: (record) => ({
      disabled:
        (selectedWarehouseSlug !== null && record.warehouse.slug !== selectedWarehouseSlug) ||
        (selectedDeviceStatus !== null && selectedDeviceStatus !== record.isAssigned),
    }),
  };

  const DeviceTable = (
    <Table
      loading={isLoading}
      className={tableStyles.devicesTable}
      rowKey="id"
      size="small"
      bordered={false}
      columns={columns}
      dataSource={devices}
      rowSelection={rowSelection}
      rowClassName={(_, index) => (index % 2 !== 0 ? tableStyles.evenRow : tableStyles.oddRow)}
      scroll={{ x: calculateTableWidth() }}
      onChange={onTableChange}
      pagination={{
        className: tableStyles.pagination,
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
    <div className={tableStyles.customPagination}>
      <ConfigProvider locale={antdLocale}>{DeviceTable}</ConfigProvider>
    </div>
  );
};
