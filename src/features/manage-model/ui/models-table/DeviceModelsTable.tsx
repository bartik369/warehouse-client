import { Table } from 'antd';

import { Model } from '@/entities/model/model/types';
import tableStyles from '@/shared/ui/table/table.module.scss';

import { DeviceModelsColumns } from '../../model/device-models-columns';

interface DeviceModelsTableProps {
  page: number;
  limit: number;
  data: Model[];
  loading: boolean;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}
export const DeviceModelsTable = ({
  page,
  limit,
  data,
  loading,
  onEdit,
  onDelete,
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
        pageSize: 10,
        current: page,
        total: data.length,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '50', '100'],
        showTotal: (total, range) => `${range[0]}-${range[1]} из ${total} записей`,
      }}
    />
  );
};
