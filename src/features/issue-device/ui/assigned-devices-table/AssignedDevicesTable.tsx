import { useState } from 'react';

import { Table } from 'antd';
import clsx from 'clsx';

import { Device } from '@/entities/device/model/types';
import { useAppSelector } from '@/shared/hooks/useRedux';
import { TableTypography } from '@/shared/types/typography';
import tableStyles from '@/shared/ui/table/table.module.scss';

import { getAssignedDeviceColumns } from '../../model/getAssignedDeviceColumns';

interface AssignedDevicesTableProps {
  typography: TableTypography;
  loading?: boolean;
  devices: Device[];
  onDelete?: (id: string) => void;
}
export const AssignedDevicesTable = ({
  typography,
  loading,
  devices,
  onDelete,
}: AssignedDevicesTableProps) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const issueStep = useAppSelector((state) => state.issue.issueStep);
  const isReadonlyStep = issueStep === 3 || issueStep === 1;
  const columns = getAssignedDeviceColumns({
    onDelete,
    hideActions: isReadonlyStep,
    pageSize,
    currentPage: page,
  });

  return (
    <Table<Device>
      bordered
      loading={loading}
      className={clsx(tableStyles.devicesTable, tableStyles[typography])}
      tableLayout="fixed"
      size="small"
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
