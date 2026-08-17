import { Empty, Flex, Typography } from 'antd';
import { Divider } from 'antd';

import { Device } from '@/entities/device/model/types';
import { User } from '@/entities/user/model/types';
import { Spinner } from '@/shared/ui/spinner/Spinner';

import { ASSIGNED_USER_DEVICES } from '../../model/constants';
import { AssignedDevicesTable } from '../assigned-devices-table/AssignedDevicesTable';
import { Details } from './user-card/details/Details';
import { Information } from './user-card/information/Information';

interface UserInfoProps {
  user: User;
  assignedUserDevices: Device[];
  isLoading: boolean;
}
export const UserInfo = ({ user, assignedUserDevices, isLoading }: UserInfoProps) => {
  return (
    <Flex vertical>
      <Information user={user} />
      <Details user={user} />
      <Divider />
      <Typography.Title level={5}>{ASSIGNED_USER_DEVICES}</Typography.Title>
      {isLoading ? (
        <Spinner />
      ) : assignedUserDevices.length > 0 ? (
        <AssignedDevicesTable devices={assignedUserDevices} />
      ) : (
        <Empty />
      )}
    </Flex>
  );
};
