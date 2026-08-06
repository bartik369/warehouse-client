import { Button, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { RiDeleteBin4Line } from 'react-icons/ri';

import { Device } from '@/entities/device/model/types';
import { DEVICE_TYPES } from '@/shared/ui/device-autocomplete/constants';
import tableStyles from '@/shared/ui/table/table.module.scss';
import { AssignedDevice } from '@/types/issue';

export const getAssignedDeviceColumns = ({
  onDelete,
  hideActions = false,
}: {
  onDelete: (id: string) => void;
  hideActions?: boolean;
}): ColumnsType<Device> => {
  return [
    {
      key: 'icon',
      width: 20,
      onCell: () => ({
        style: {
          paddingLeft: 0,
          paddingRight: 0,
          textAlign: 'center',
        },
      }),
      render: (record: Device) => {
        const isDeviceType = (value: string): value is keyof typeof DEVICE_TYPES => {
          return value in DEVICE_TYPES;
        };
        const Icon = isDeviceType(record.typeSlug) ? DEVICE_TYPES[record.typeSlug].icon : undefined;
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
    },
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
      width: 150,
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
      width: 150,
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
