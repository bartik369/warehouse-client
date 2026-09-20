import { Table } from 'antd';

import { Model } from '@/entities/model/model/types';
import tableStyles from '@/shared/ui/table/table.module.scss';

import { DeviceModelsColumns } from '../model/device-models-columns';

interface DeviceModelsTableProps {
  totalCount?: number;
  page: number;
  limit: number;
  data?: Model[];
  loading: boolean;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
}
export const DeviceModelsTable = ({
  totalCount,
  page,
  limit,
  data,
  loading,
  onEdit,
  onDelete,
  setPage,
  setLimit,
}: DeviceModelsTableProps) => {
  const columns = DeviceModelsColumns({ onDelete, onEdit });
  return (
    <Table<Model>
      columns={columns}
      dataSource={data}
      loading={loading}
      rowKey="id"
      size="small"
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
