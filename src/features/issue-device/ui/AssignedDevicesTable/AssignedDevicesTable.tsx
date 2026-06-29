import { useState } from 'react';

import { Table } from 'antd';

import { useAppSelector } from '@/hooks/redux/useRedux';
import tableStyles from '@/shared/ui/table/table.module.scss';
import { AssignedDevice } from '@/types/issue';

import { getAssignedDeviceColumns } from '../../model/getAssignedDeviceColumns';

interface AssignedDevicesTableProps {
  devices?: AssignedDevice[];
  deleteDevice: (id: string) => void;
}
export const AssignedDevicesTable = ({ devices, deleteDevice }: AssignedDevicesTableProps) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const issueStep = useAppSelector((state) => state.issue.issueStep);
  const isReadonlyStep = issueStep === 3;
  const columns = getAssignedDeviceColumns({ deleteDevice, hideActions: isReadonlyStep });

  return (
    <Table<AssignedDevice>
      className={tableStyles.table}
      pagination={
        isReadonlyStep
          ? false
          : {
              className: tableStyles.pagination,
              pageSize,
              current: page,
              total: devices?.length ?? 0,
              showSizeChanger: true,
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
