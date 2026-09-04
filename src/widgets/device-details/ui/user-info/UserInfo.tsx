import { Divider, Empty, Flex, Spin } from 'antd';
import { IoCalendarOutline } from 'react-icons/io5';
import { RiUserReceivedLine, RiUserSharedLine } from 'react-icons/ri';

import { DeviceDetails } from '@/entities/device/model/types';
import { formatDate } from '@/shared/lib/date/formatDate';
import { LoadingContent } from '@/shared/ui/loading-content/LoadingContent';
import { useGetIssueByDeviceQuery } from '@/store/api/issueApi';
import { useGetUserQuery } from '@/store/api/userApi';

import styles from './UserInfo.module.scss';

interface UserInfoProps {
  device: DeviceDetails;
}

export const UserInfo = ({ device }: UserInfoProps) => {
  const { data: user, isLoading: isUserLoading } = useGetUserQuery(device.assignedUserId, {
    skip: !device.assignedUserId,
  });

  const { data: issue, isLoading: isIssueLoading } = useGetIssueByDeviceQuery(device.id, {
    skip: !device.id,
  });

  const isLoading = isUserLoading || isIssueLoading;

  if (isLoading) {
    return <LoadingContent className={styles.content} />;
  }

  return (
    <Flex className={styles.content}>
      <span className={styles.title}>Кто использует:</span>
      <Flex className={styles.profile}>
        <Flex className={styles.icon}>
          <RiUserReceivedLine />
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
          <RiUserSharedLine />
        </Flex>
        <Flex className={styles.user}>
          <span className={styles.name}>
            {issue?.issuedBy.lastNameEn} {issue?.issuedBy.firstNameEn}
          </span>
          <span className={styles.value}>{issue?.issuedBy.email}</span>
          <span className={styles.value}>{issue?.issuedBy.workId}</span>
        </Flex>
      </Flex>
      <Divider style={{ margin: 0 }} />
      <span className={styles.title}>Дата выдачи:</span>
      <Flex align="center" gap={5}>
        <IoCalendarOutline className={styles.valueIcon} />
        <span className={styles.value}>{formatDate(issue?.updatedAt, 'datetime')}</span>
      </Flex>
    </Flex>
  );
};
