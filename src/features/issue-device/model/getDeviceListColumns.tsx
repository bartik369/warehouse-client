import { Typography } from 'antd';
import type { ColumnType, ColumnsType } from 'antd/es/table';

import { Device } from '@/entities/device/model/types';
import { DEVICE_TYPES } from '@/shared/ui/device-autocomplete/constants';

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
    render: (_value: unknown, record: Device) => {
      const typeSlug = record.model?.type?.slug ?? '';
      const Icon =
        typeSlug in DEVICE_TYPES
          ? DEVICE_TYPES[typeSlug as keyof typeof DEVICE_TYPES].icon
          : undefined;

      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            backgroundColor: 'var(--gray-50)',
            padding: '8px',
            margin: '5px',
            borderRadius: '8px',
          }}
        >
          {Icon && <Icon size={20} color="var(--muted-blue-700)" />}
        </div>
      );
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
