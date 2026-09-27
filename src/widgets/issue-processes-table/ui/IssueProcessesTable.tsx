import type { Key } from 'react';

import { ConfigProvider, Table } from 'antd';
import { useNavigate } from 'react-router-dom';

import { IssueProcessListItem } from '@/features/issue-device/model/types';
import { antdLocale } from '@/shared/config/antd-locale';
import { ROUTES } from '@/shared/config/routes/routes';
import tableStyles from '@/shared/ui/table/table.module.scss';

import { getIssueProcessesColumns } from '../model/issue-processes.columns';

interface IssueProcessesTableProps {
  page: number;
  limit: number;
  totalCount: number;
  selectedRowKeys: Key[];
  loading: boolean;
  issueProcesses?: IssueProcessListItem[];
  onSelect: (record: IssueProcessListItem, selected: boolean) => void;
  onDelete: (processId: string) => void;
  setPage: (value: number) => void;
  setLimit: (value: number) => void;
}

export const IssueProcessesTable = ({
  page,
  limit,
  totalCount,
  selectedRowKeys,
  issueProcesses,
  loading,
  onSelect,
  onDelete,
  setPage,
  setLimit,
}: IssueProcessesTableProps) => {
  const navigate = useNavigate();

  const handleOpenProcess = (id: string) => {
    if (!id) return;
    navigate(ROUTES.ISSUE(id));
  };
  const handleContinueProcess = (id: string) => {
    if (!id) return;
    navigate(`/issues/${id}/edit`);
  };

  const columns = getIssueProcessesColumns({
    onOpen: handleOpenProcess,
    onContinue: handleContinueProcess,
    onDelete,
  });

  const IssueProcessTable = (
    <Table
      loading={loading}
      className={tableStyles.devicesTable}
      rowKey="id"
      size="small"
      scroll={{ x: 'max-content' }}
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
        total: totalCount,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '50', '100'],
        showTotal: (total, range) => `${range[0]}-${range[1]} из ${total} записей`,
        onChange: (page, pageSize) => {
          if (pageSize !== limit) {
            setLimit(pageSize);
            return;
          }
          setPage(page);
        },
      }}
    />
  );

  return (
    <div className={tableStyles.customPagination}>
      <ConfigProvider locale={antdLocale}>{IssueProcessTable}</ConfigProvider>
    </div>
  );
};
