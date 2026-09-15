import { Flex } from 'antd';
import { MdOutlineModeEdit } from 'react-icons/md';
import { MdOutlineDelete } from 'react-icons/md';

import { Model } from '@/entities/model/model/types';
import { PATHS } from '@/shared/api/paths';
import { IconButton } from '@/shared/ui/icon-button/IconButton';

export const DeviceModelsColumns = ({
  onDelete,
  onEdit,
}: {
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}) => [
  {
    key: 'pick',
    title: 'Изображение',
    width: 30,
    render: (record: Model) => {
      return (
        <div style={{ width: '50px', justifyContent: 'center', height: '30px' }}>
          <img
            src={`${PATHS.models}${record.imagePath}`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              display: 'block',
            }}
          />
        </div>
      );
    },
  },
  {
    key: 'name',
    dataIndex: 'name',
    title: 'Название',
    width: 200,
  },
  {
    key: 'slug',
    dataIndex: 'slug',
    title: 'Slug',
    width: 200,
  },
  {
    key: 'manufacturer',
    dataIndex: ['manufacturer', 'name'],
    title: 'Производитель',
  },
  {
    key: 'type',
    dataIndex: ['type', 'name'],
    title: 'Тип',
    width: 200,
  },
  {
    key: 'actions',
    width: 50,
    render: (record: Model) => {
      return (
        <Flex gap={10}>
          <IconButton icon={MdOutlineModeEdit} onClick={() => onEdit(record.id)} />
          <IconButton icon={MdOutlineDelete} onClick={() => onDelete(record.id)} variant="danger" />
        </Flex>
      );
    },
  },
];
