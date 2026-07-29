import { Card, Flex } from 'antd';
import { Divider } from 'antd';

import { UserRolesResponse } from '@/entities/role/model/types';

import { RoleList } from './role/RoleList';
import { UserInfo } from './user/UserInfo';

interface UserAccessCardProps {
  userRoles: UserRolesResponse;
  deletingId: string | null;
  loading: boolean;
  onDelete: (id: string) => void;
}
export const UserAccessCard = ({
  userRoles,
  loading,
  deletingId,
  onDelete,
}: UserAccessCardProps) => {
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
        <RoleList
          deletingId={deletingId}
          roles={userRoles.roles}
          onDelete={onDelete}
          loading={loading}
        />
      </Flex>
    </Card>
  );
};
