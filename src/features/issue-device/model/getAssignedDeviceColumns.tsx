import { Button, Typography } from 'antd';
import type { ColumnType, ColumnsType } from 'antd/es/table';
import { RiDeleteBin4Line } from 'react-icons/ri';

import { Device } from '@/entities/device/model/types';
import { DEVICE_TYPES } from '@/shared/ui/device-autocomplete/constants';
import tableStyles from '@/shared/ui/table/table.module.scss';
import { AssignedDevice } from '@/types/issue';

export const getAssignedDeviceColumns = ({
  onDelete,
  hideActions = false,
  currentPage,
  pageSize,
}: {
  onDelete?: (id: string) => void;
  hideActions?: boolean;
  currentPage: number;
  pageSize: number;
}): ColumnsType<Device> => {
  const iconColumn: ColumnType<Device> = {
    key: 'icon',
    width: 20,
    onCell: () => ({
      style: {
        paddingLeft: 0,
        paddingRight: 0,
        textAlign: 'center',
      },
    }),
    render: (_value: unknown, record: Device) => {
      const Icon =
        record.typeSlug in DEVICE_TYPES
          ? DEVICE_TYPES[record.typeSlug as keyof typeof DEVICE_TYPES].icon
          : undefined;

      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          {Icon && <Icon size={20} />}
        </div>
      );
    },
  };

  const numberColumn: ColumnType<Device> = {
    key: 'number',
    title: '№',
    width: 40,
    align: 'center',
    render: (_value, _record, index) => (currentPage - 1) * pageSize + index + 1,
  };
  return [
    ...(!hideActions ? [iconColumn] : [numberColumn]),
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
      width: 100,
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
    ...(!hideActions
      ? [
          {
            key: 'actions',
            width: 40,
            render: (record: AssignedDevice) => (
              <Button
                type="link"
                icon={<RiDeleteBin4Line className={tableStyles.icon} />}
                onClick={() => onDelete?.(record.id)}
                title="Удалить"
              />
            ),
          },
        ]
      : []),
  ];
};
