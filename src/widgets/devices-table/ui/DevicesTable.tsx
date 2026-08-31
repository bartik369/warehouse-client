import { useState } from 'react';

import { ConfigProvider, Table } from 'antd';
import {
  FilterValue,
  SorterResult,
  TablePaginationConfig,
  TableRowSelection,
} from 'antd/es/table/interface';
import { useNavigate } from 'react-router-dom';

import { Device } from '@/entities/device/model/types';
import { antdLocale } from '@/shared/config/antd-locale';
import tableStyles from '@/shared/ui/table/table.module.scss';
import { DeviceFilters, FilterDeviceOptions } from '@/types/devices';

import { getDevicesColumns } from '../model/devices.columns';

interface DeviceTableProps {
  devices: Device[];
  page: number;
  limit: number;
  totalCount: number;
  isLoading: boolean;
  setDevices: (devices: Device[]) => void;
  setPage: (page: number) => void;
  onTableChange: (
    _pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    _sorter: SorterResult<Device>[] | SorterResult<Device>
  ) => void;
}

export const DevicesTable = ({
  devices,
  page,
  limit,
  totalCount,
  isLoading,
  setPage,
  setDevices,
  onTableChange,
}: DeviceTableProps) => {
  const [selectedWarehouseSlug, setSelectedWarehouseSlug] = useState<string | null>(null);
  const [selectedDeviceStatus, setSelectedDeviceStatus] = useState<boolean | null>(null);
  const navigate = useNavigate();

  const handleDeviceInfo = (deviceId: string) => {
    navigate(`/devices/${deviceId}`);
  };

  const columns = getDevicesColumns({
    onView: handleDeviceInfo,
  });

  const calculateTableWidth = () => {
    const totalWidth = columns.reduce((sum, col) => {
      return sum + (Number(col.width) || 100);
    }, 0);
    return totalWidth;
  };

  const rowSelection: TableRowSelection<Device> = {
    type: 'checkbox',
    onChange: (selectedRowKeys, selectedRows) => {
      setDevices(selectedRows);
      if (selectedRowKeys.length === 0) {
        setSelectedWarehouseSlug(null);
        setSelectedDeviceStatus(null);
      } else {
        setSelectedWarehouseSlug(selectedRows[0].warehouse?.slug ?? '');
        setSelectedDeviceStatus(selectedRows[0].isAssigned);
      }
    },
    getCheckboxProps: (record) => ({
      disabled:
        (selectedWarehouseSlug !== null && record.warehouse?.slug !== selectedWarehouseSlug) ||
        (selectedDeviceStatus !== null && selectedDeviceStatus !== record.isAssigned),
    }),
  };
  const DeviceTable = (
    <Table
      loading={isLoading}
      showSorterTooltip={false}
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
