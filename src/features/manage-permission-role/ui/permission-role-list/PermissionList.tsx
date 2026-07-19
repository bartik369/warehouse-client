import { Flex } from 'antd';

import { PermissionRole, UserRolesList } from '@/entities/permission-role/model/types';

import { PermissionItem } from './PermissionItem';

interface PermissionListProps {
  roles: PermissionRole[];
  onEdit?: (role: PermissionRole) => void;
  onDelete?: (id: string) => void;
}

export const PermissionList = ({ roles, onEdit, onDelete }: PermissionListProps) => {
  return (
    <Flex vertical>
      {roles.map((role) => (
        <PermissionItem key={role.id} role={role} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </Flex>
  );
};
