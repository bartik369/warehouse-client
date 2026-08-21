import { Table } from 'antd';

import { Device } from '@/entities/device/model/types';

import { getDeviceListColumns } from '../../model/getDeviceListColumns copy';
import styles from './DeviceListTable.module.scss';

interface DeviceListTableProps {
  devices: Device[];
}
export const DeviceListTable = ({ devices }: DeviceListTableProps) => {
  const columns = getDeviceListColumns();

  return (
    <Table<Device>
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
