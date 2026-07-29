import { Empty, Flex, Typography } from 'antd';

import { userRoleScopeKey } from '@/entities/access/lib/user-role-scope-key';
import { UserRoleAssignment } from '@/entities/role/model/types';

import { RoleItem } from './RoleItem';
import { TITLES } from './constants';

interface RoleListProps {
  roles: UserRoleAssignment[];
  loading: boolean;
  deletingId: string | null;
  onDelete: (id: string) => void;
}

export const RoleList = ({ roles, loading, deletingId, onDelete }: RoleListProps) => {
  const hasRoles = roles.length > 0;
  return (
    <Flex vertical gap={15}>
      <Flex justify="center">
        <Typography.Title level={3}>{TITLES.user_roles}</Typography.Title>
      </Flex>
      {hasRoles ? (
        roles.map((role) => (
          <RoleItem
            key={userRoleScopeKey(role)}
            deletingId={deletingId}
            role={role}
            loading={loading}
            onDelete={onDelete}
          />
        ))
      ) : (
        <Empty />
      )}
    </Flex>
  );
};
