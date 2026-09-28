import { Flex, Typography } from 'antd';

import { User } from '@/entities/user/model/types';

import styles from './UserAutocomplete.module.scss';

interface UserAutocompleteItemProps {
  user: User;
}
export const UserAutocompleteItem = ({ user }: UserAutocompleteItemProps) => {
  const prevName = `${user.lastNameRu[0]}${user.firstNameRu[0]}`;
  return (
    <Flex className={styles.item}>
      <div className={styles.icon}>{prevName}</div>
      <Flex vertical>
        <Typography.Text className={styles.ruName}>
          {user.lastNameRu} {user.firstNameRu}
        </Typography.Text>
        <Typography.Text className={styles.enName}>
          {user.lastNameEn} {user.firstNameEn}
        </Typography.Text>
        <Typography.Text className={styles.email}>{user.email}</Typography.Text>
      </Flex>
    </Flex>
  );
};
