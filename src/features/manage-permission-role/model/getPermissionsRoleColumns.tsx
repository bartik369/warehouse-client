import { Flex, Popover, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { MdOutlineDelete, MdOutlineEdit } from 'react-icons/md';

import { PermissionRole } from '@/entities/permission-role/model/types';
import { IconButton } from '@/shared/ui/icon-button/IconButton';

import styles from '../ui/ManagePermissionRole.module.scss';
import { TITLES, userRoleInfo } from './constants';

export const getPermissionsRoleColumns = ({
  onEdit,
  onDelete,
}: {
  onEdit?: (rolePermissions: PermissionRole) => void;
  onDelete?: (id: string) => void;
}): ColumnsType<PermissionRole> => [
  {
    key: 'role',
    title: 'Название роли',
    sorter: (a, b) => userRoleInfo[a.roleName].title.localeCompare(userRoleInfo[b.roleName].title),
    render: (_, record) => {
      const roleInfo = userRoleInfo[record.roleName];
      return (
        <Flex className={styles.role}>
          <div className={styles.icon}>{roleInfo.icon}</div>
          <span className={styles.title}>{roleInfo.title}</span>
        </Flex>
      );
    },
  },
  {
    key: 'permissions',
    title: 'Разрешения',
    width: 200,
    render: (_, record) => {
      const permissions = record.permissionsName ?? [];
      const visible = permissions.slice(0, 2);
      const hidden = permissions.slice(2);
      return (
        <Flex gap={5} align="center" justify="center" wrap={false}>
          {permissions.length === 0 && <span>Все роли</span>}
          {visible.map((item) => (
            <Tag key={item} className={styles.tag}>
              {item}
            </Tag>
          ))}
          {hidden.length > 0 && (
            <Popover
              title={<div className={styles.dropTitle}>{TITLES.OTHERS_PERMISSIONS}</div>}
              content={
                <Flex vertical gap={5}>
                  {hidden.map((permission) => (
                    <Tag key={permission} className={styles.tag}>
                      {permission}
                    </Tag>
                  ))}
                </Flex>
              }
              trigger="click"
            >
              <Tag className={styles.drop}>+{hidden.length}</Tag>
            </Popover>
          )}
        </Flex>
      );
    },
  },
  {
    key: 'warehouse',
    title: 'Склад',
    sorter: (a, b) => (a.warehouseName ?? '').localeCompare(b.warehouseName ?? ''),
    render: (_, record) => {
      const permissions = record.permissionsName ?? [];
      if (permissions.length === 0) {
        return (
          <Flex justify="center">
            <span>Все склады</span>
          </Flex>
        );
      }
      return <div>{record.warehouseName}</div>;
    },
  },
  {
    key: 'warehouse',
    title: 'Город',
    dataIndex: 'locationName',
    sorter: (a, b) => (a.locationName ?? '').localeCompare(b.locationName ?? ''),
  },
  {
    key: 'comment',
    title: 'Описание',
    dataIndex: 'comment',
  },
  {
    key: 'actions',
    width: 40,
    fixed: 'right' as const,
    render: (_, record) => {
      return (
        <Flex gap={5}>
          <IconButton icon={MdOutlineEdit} iconSize={14} onClick={() => onEdit?.(record)} />
          <IconButton
            icon={MdOutlineDelete}
            variant="danger"
            iconSize={14}
            onClick={() => onDelete?.(record.roleId)}
          />
        </Flex>
      );
    },
  },
];
