import { Table } from 'antd';

import { Device } from '@/entities/device/model/types';

import { getDeviceListColumns } from '../../model/getDeviceListColumns';
import styles from './DeviceListTable.module.scss';

interface DeviceListTableProps {
  devices: Device[];
  loading: boolean;
}
export const DeviceListTable = ({ devices, loading }: DeviceListTableProps) => {
  const columns = getDeviceListColumns();

  return (
    <Table<Device>
      loading={loading}
      bordered
      className={styles.table}
      tableLayout="fixed"
      pagination={false}
      rowKey="id"
      columns={columns}
      dataSource={devices ?? []}
    />
  );
};
