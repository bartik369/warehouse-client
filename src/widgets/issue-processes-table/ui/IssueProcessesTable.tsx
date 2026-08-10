import type { Key } from 'react';

import { ConfigProvider, Table } from 'antd';

import { IssueProcessListItem } from '@/features/issue-device/model/types';
import { antdLocale } from '@/shared/config/antd-locale';
import tableStyles from '@/shared/ui/table/table.module.scss';

import { getIssueProcessesColumns } from '../model/issue-processes.columns';

interface IssueProcessesTableProps {
  page: number;
  limit: number;
  selectedRowKeys: Key[];
  issueProcesses: IssueProcessListItem[];
  onSelect: (record: IssueProcessListItem, selected: boolean) => void;
}

export const IssueProcessesTable = ({
  page,
  limit,
  selectedRowKeys,
  issueProcesses,
  onSelect,
}: IssueProcessesTableProps) => {
  const columns = getIssueProcessesColumns();

  const IssueProcessTable = (
    <Table
      className={tableStyles.devicesTable}
      rowKey="id"
      size="small"
      bordered={false}
      columns={columns}
      dataSource={issueProcesses}
      rowClassName={(_, index) => (index % 2 !== 0 ? tableStyles.evenRow : tableStyles.oddRow)}
      rowSelection={{
        selectedRowKeys,
        hideSelectAll: true,
        onSelect: onSelect,
      }}
      pagination={{
        className: tableStyles.pagination,
        pageSize: limit,
        current: page,
        total: issueProcesses.length,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '50', '100'],
        showTotal: (total, range) => `${range[0]}-${range[1]} из ${total} записей`,
      }}
    />
  );

  return (
    <div className={tableStyles.customPagination}>
      <ConfigProvider locale={antdLocale}>{IssueProcessTable}</ConfigProvider>
    </div>
  );
};
