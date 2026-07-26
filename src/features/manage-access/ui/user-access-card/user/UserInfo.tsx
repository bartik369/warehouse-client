import { Flex, Typography } from 'antd';
import { FiUser } from 'react-icons/fi';

import { User } from '@/entities/ user/model/types';

import styles from './UserInfo.module.scss';

interface UserInfoProps {
  user: User;
}
export const UserInfo = ({ user }: UserInfoProps) => {
  return (
    <Flex gap={10}>
      <div className={styles.profile}>
        <div className={styles.icon}>
          <FiUser />
        </div>
      </div>
      <Flex gap={30} align="center">
        <div className={styles.name}>
          <div className={styles.ru}>
            <Typography.Text>{user.lastNameRu}</Typography.Text>
            <Typography.Text>{user.firstNameRu}</Typography.Text>
          </div>
          <div className={styles.en}>
            <Typography.Text>{user.lastNameEn}</Typography.Text>
            <Typography.Text>{user.firstNameEn}</Typography.Text>
          </div>
        </div>
        <div className={styles.info}>
          <span className={styles.label}>Рабочий ID</span>
          <Typography.Text className={styles.value}>{user.workId}</Typography.Text>
        </div>
        <div className={styles.info}>
          <span className={styles.label}>email</span>
          <Typography.Text className={styles.value}>{user.email}</Typography.Text>
        </div>
      </Flex>
    </Flex>
  );
};
