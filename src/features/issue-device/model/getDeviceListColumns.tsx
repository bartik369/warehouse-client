import { Typography } from 'antd';
import type { ColumnType, ColumnsType } from 'antd/es/table';

import { Device } from '@/entities/device/model/types';

export const getDeviceListColumns = (): ColumnsType<Device> => {
  const iconColumn: ColumnType<Device> = {
    key: 'icon',
    width: 30,
    onCell: () => ({
      style: {
        paddingLeft: 0,
        paddingRight: 0,
        textAlign: 'center',
      },
    }),
    render: (_value: unknown, record: Device, index) => {
      return <>{index + 1}</>;
    },
  };

  return [
    ...[iconColumn],
    {
      key: 'name',
      title: 'Название',
      dataIndex: 'name',
      width: 150,
      onCell: () => ({
        style: {
          paddingInline: 8,
        },
      }),
      render: (name: string) => (
        <Typography.Text
          style={{
            display: 'block',
            width: '100%',
          }}
          ellipsis={{ tooltip: name }}
        >
          {name}
        </Typography.Text>
      ),
    },
    {
      key: 'modelName',
      title: 'Модель',
      dataIndex: 'modelName',
      width: 100,
    },
    {
      key: 'inventoryNumber',
      title: 'Инв. номер',
      dataIndex: 'inventoryNumber',
      width: 90,
    },
    {
      key: 'serialNumber',
      title: 'Сер. номер',
      dataIndex: 'serialNumber',
      width: 130,
      render: (name: string) => (
        <Typography.Text
          style={{
            display: 'block',
            width: '100%',
          }}
          ellipsis={{ tooltip: name }}
        >
          {name}
        </Typography.Text>
      ),
    },
  ];
};
