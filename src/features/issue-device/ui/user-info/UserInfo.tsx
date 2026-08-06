import { Flex, Typography } from 'antd';
import { Divider } from 'antd';

import { User } from '@/entities/ user/model/types';

import { ASSIGNED_USER_DEVICES } from '../../model/constants';
import { Details } from './user-card/details/Details';
import { Information } from './user-card/information/Information';

interface UserInfoProps {
  user: User;
}
export const UserInfo = ({ user }: UserInfoProps) => {
  return (
    <Flex vertical>
      <Information user={user} />
      <Details user={user} />
      <Divider />
      <Typography.Title level={5}>{ASSIGNED_USER_DEVICES}</Typography.Title>
    </Flex>
  );
};
