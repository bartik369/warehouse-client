import { Button } from 'antd';
import { RiDeleteBin4Line } from 'react-icons/ri';

import tableStyles from '@/shared/ui/table/table.module.scss';
import { AssignedDevice } from '@/types/issue';

export const getAssignedDeviceColumns = ({
  deleteDevice,
  hideActions = false,
}: {
  deleteDevice: (id: string) => void;
  hideActions?: boolean;
}) => {
  return [
    {
      key: 'name',
      title: 'Название',
      dataIndex: 'name',
      width: 290,
    },
    {
      key: 'modelName',
      title: 'Модель',
      dataIndex: 'modelName',
      width: 230,
    },
    {
      key: 'modelType',
      title: 'Тип',
      dataIndex: 'modelType',
      width: 200,
    },
    {
      key: 'manufacturer',
      title: 'Производитель',
      dataIndex: 'manufacturer',
      width: 110,
    },
    {
      key: 'inventoryNumber',
      title: 'Инв. номер',
      dataIndex: 'inventoryNumber',
      width: 220,
    },
    {
      key: 'serialNumber',
      title: 'Сер. номер',
      dataIndex: 'serialNumber',
      width: 220,
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
                onClick={() => deleteDevice?.(record.id)}
                title="Удалить"
              />
            ),
          },
        ]
      : []),
  ];
};
