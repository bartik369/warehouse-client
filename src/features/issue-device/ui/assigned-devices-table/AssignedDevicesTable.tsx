import { useState } from 'react';

import { Table } from 'antd';

import { Device } from '@/entities/device/model/types';
import { useAppSelector } from '@/hooks/redux/useRedux';

import { getAssignedDeviceColumns } from '../../model/getAssignedDeviceColumns';
import styles from './AssignedDevicesTable.module.scss';

interface AssignedDevicesTableProps {
  devices: Device[];
  onDelete?: (id: string) => void;
}
export const AssignedDevicesTable = ({ devices, onDelete }: AssignedDevicesTableProps) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const issueStep = useAppSelector((state) => state.issue.issueStep);
  const isReadonlyStep = issueStep === 3;
  const columns = getAssignedDeviceColumns({
    onDelete,
    hideActions: isReadonlyStep,
    pageSize,
    currentPage: page,
  });

  return (
    <Table<Device>
      className={styles.table}
      tableLayout="fixed"
      pagination={
        isReadonlyStep
          ? false
          : {
              pageSize,
              showSizeChanger: false,
              current: page,
              total: devices?.length ?? 0,
              pageSizeOptions: ['10', '20', '50', '100'],
              showTotal: (total, range) => `${range[0]}-${range[1]} из ${total} записей`,
              onChange: (page, pageSize) => {
                setPage(page);
                setPageSize(pageSize);
              },
            }
      }
      rowKey="id"
      columns={columns}
      dataSource={devices ?? []}
    />
  );
};
