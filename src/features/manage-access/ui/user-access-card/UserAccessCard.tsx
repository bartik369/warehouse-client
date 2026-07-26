import { Card, Flex } from 'antd';
import { Divider } from 'antd';

import { UserRolesResponse } from '@/entities/role/model/types';

import { RoleList } from './role/RoleList';
import { UserInfo } from './user/UserInfo';

interface UserAccessCardProps {
  userRoles: UserRolesResponse;
}
export const UserAccessCard = ({ userRoles }: UserAccessCardProps) => {
  return (
    <Card>
      <Flex gap={20} vertical>
        <UserInfo user={userRoles.user} />
        <Divider
          dashed
          style={{
            margin: '0',
          }}
        />
        <RoleList roles={userRoles.roles} />
      </Flex>
    </Card>
  );
};
