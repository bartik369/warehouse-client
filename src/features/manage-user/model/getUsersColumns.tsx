import { MdOutlineEdit } from 'react-icons/md';

import { UserWithRelations } from '@/entities/user/model/types';
import { CustomTag } from '@/shared/ui/custom-tag/CustomTag';
import { IconButton } from '@/shared/ui/icon-button/IconButton';

export const getUsersColumns = ({ onEdit }: { onEdit: (id: string) => void }) => [
  {
    key: 'дфые',
    title: 'Пользователь',
    width: 200,
    render: (record: UserWithRelations) => {
      return (
        <>
          {record.lastNameRu} {record.firstNameRu}
        </>
      );
    },
  },
  {
    key: 'contacts',
    title: 'Контакты',
    dataIndex: 'email',
    width: 200,
  },
  {
    key: 'department',
    title: 'Отдел',
    dataIndex: ['department', 'name'],
    width: 150,
  },
  {
    key: 'status',
    width: 120,
    title: 'Статус',
    render: (record: UserWithRelations) => {
      const status = record.isActive;
      return (
        <>
          {status ? (
            <CustomTag title="Активен" size="sm" />
          ) : (
            <CustomTag title="Неактивен" variant="error" size="sm" />
          )}
        </>
      );
    },
  },
  {
    key: 'actions',
    width: 30,
    fixed: 'right' as const,
    render: (record: UserWithRelations) => {
      return (
        <IconButton icon={MdOutlineEdit} variant="primary" onClick={() => onEdit(record.id)} />
      );
    },
  },
];
