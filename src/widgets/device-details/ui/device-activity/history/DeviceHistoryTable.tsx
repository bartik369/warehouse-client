import { ConfigProvider, Table } from 'antd';
import clsx from 'clsx';

import { antdLocale } from '@/shared/config/antd-locale';
import tableStyles from '@/shared/ui/table/table.module.scss';
import { TableTypography } from '@/types/typography';
import { DeviceHistoryItem } from '@/widgets/device-details/model/types';

import { getDeviceHistoryColumns } from './columns';

interface DeviceHistoryTableProps {
  typography: TableTypography;
  loading: boolean;
  data: DeviceHistoryItem[];
  page: number;
  limit: number;
}
export const DeviceHistoryTable = ({
  typography,
  data,
  page,
  limit,
  loading,
}: DeviceHistoryTableProps) => {
  const columns = getDeviceHistoryColumns();
  const DeviceHistoryTable = (
    <Table
      className={clsx(tableStyles.devicesTable, tableStyles[typography])}
      loading={loading}
      columns={columns}
      dataSource={data}
      rowKey="id"
      size="middle"
      showSorterTooltip={false}
      bordered={false}
      rowClassName={(_, index) => (index % 2 !== 0 ? tableStyles.evenRow : tableStyles.oddRow)}
      pagination={{
        className: tableStyles.pagination,
        pageSize: limit,
        current: page,
        total: data.length,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '50', '100'],
        showTotal: (total, range) => `${range[0]}-${range[1]} из ${total} записей`,
      }}
    />
  );
  return (
    <div className={tableStyles.customPagination}>
      <ConfigProvider locale={antdLocale}>{DeviceHistoryTable}</ConfigProvider>
    </div>
  );
};
