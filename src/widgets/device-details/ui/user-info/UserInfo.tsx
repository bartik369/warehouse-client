import { Flex, Typography } from 'antd';
import { PiUserDuotone } from 'react-icons/pi';

import { DeviceDetails } from '@/entities/device/model/types';
import { useGetIssueByDeviceQuery } from '@/store/api/issueApi';
import { useGetUserQuery } from '@/store/api/userApi';

import styles from './UserInfo.module.scss';

interface UserInfoProps {
  device: DeviceDetails;
}

export const UserInfo = ({ device }: UserInfoProps) => {
  const { data: user } = useGetUserQuery(device.assignedUserId, {
    skip: !device.assignedUserId,
  });
  const { data: issue } = useGetIssueByDeviceQuery(device.id, {
    skip: !device.id,
  });

  return (
    <Flex className={styles.content}>
      <span className={styles.title}>Кто использует:</span>
      <Flex className={styles.profile}>
        <Flex className={styles.icon}>
          <PiUserDuotone />
        </Flex>
        <Flex className={styles.user}>
          <span className={styles.name}>
            {user?.lastNameRu} {user?.firstNameRu}
          </span>
          <span className={styles.value}>{user?.email}</span>
          <span className={styles.value}>{user?.workId}</span>
        </Flex>
      </Flex>
      <span className={styles.title}>Кем выдано:</span>
      <Flex className={styles.profile}>
        <Flex className={styles.icon}>
          <PiUserDuotone />
        </Flex>
        <Flex className={styles.user}>
          <span className={styles.name}>
            {issue?.issuedBy.lastNameEn} {issue?.issuedBy.firstNameEn}
          </span>
          <span className={styles.value}>{issue?.issuedBy.email}</span>
          <span className={styles.value}>{issue?.issuedBy.workId}</span>
        </Flex>
      </Flex>
    </Flex>
  );
};
