import { Table } from 'antd';
import clsx from 'clsx';

import { PermissionRole } from '@/entities/permission-role/model/types';
import tableStyles from '@/shared/ui/table/table.module.scss';
import { TableTypography } from '@/types/typography';

import { getPermissionsRoleColumns } from '../../model/getPermissionsRoleColumns';

interface PermissionsRoleTableProps {
  typography: TableTypography;
  data: PermissionRole[];
  limit: number;
  page: number;
  totalCount: number;
  loading: boolean;
  setLimit: (limit: number) => void;
  setPage: (page: number) => void;
  onEdit?: (rolePermissions: PermissionRole) => void;
  onDelete?: (id: string) => void;
}
export const PermissionsRoleTable = ({
  typography,
  data,
  limit,
  page,
  totalCount,
  loading,
  setLimit,
  setPage,
  onEdit,
  onDelete,
}: PermissionsRoleTableProps) => {
  const columns = getPermissionsRoleColumns({ onEdit, onDelete });
  return (
    <Table<PermissionRole>
      columns={columns}
      dataSource={data}
      loading={loading}
      scroll={{ x: 'max-content' }}
      rowKey="id"
      size="middle"
      className={clsx(tableStyles.devicesTable, tableStyles[typography])}
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
