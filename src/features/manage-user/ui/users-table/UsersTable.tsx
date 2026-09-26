import { Table } from 'antd';

import { UserWithRelations } from '@/entities/user/model/types';
import tableStyles from '@/shared/ui/table/table.module.scss';

import { getUsersColumns } from '../../model/getUsersColumns';

interface UsersTableProps {
  users: UserWithRelations[];
  limit: number;
  page: number;
  totalCount: number;
  loading: boolean;
  setLimit: (limit: number) => void;
  setPage: (page: number) => void;
  onEdit: (id: string) => void;
}

export const UsersTable = ({
  users,
  loading,
  limit,
  page,
  totalCount,
  setLimit,
  setPage,
  onEdit,
}: UsersTableProps) => {
  const columns = getUsersColumns({ onEdit });

  return (
    <Table<UserWithRelations>
      columns={columns}
      dataSource={users}
      loading={loading}
      scroll={{ x: 'max-content' }}
      rowKey="id"
      size="middle"
      className={tableStyles.devicesTable}
      bordered={false}
      rowClassName={(_, index) => (index % 2 !== 0 ? tableStyles.evenRow : tableStyles.oddRow)}
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
};
