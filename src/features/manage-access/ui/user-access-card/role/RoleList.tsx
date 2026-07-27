import { Card, Flex, Typography } from 'antd';

import { userRoleScopeKey } from '@/entities/access/lib/user-role-scope-key';
import { UserRolesList } from '@/entities/role/model/types';

import { RoleItem } from './RoleItem';
import { TITLES } from './constants';

interface RoleListProps {
  roles: UserRolesList[];
}

export const RoleList = ({ roles }: RoleListProps) => {
  return (
    <Flex vertical gap={15}>
      <Flex justify="center">
        <Typography.Title level={3}>{TITLES.user_roles}</Typography.Title>
      </Flex>
      {roles?.map((role) => (
        <RoleItem key={userRoleScopeKey(role)} role={role} />
      ))}
    </Flex>
  );
};
