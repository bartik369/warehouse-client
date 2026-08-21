import { Flex, Typography } from 'antd';
import { Divider } from 'antd';
import { PiUserBold } from 'react-icons/pi';

import { User } from '@/entities/user/model/types';
import { CounterpartyRole } from '@/shared/types/counterparty';
import { LABELS } from '@/utils/constants/ui/labels';

import styles from '../EquipmentIssuanceInfo.module.scss';

interface UserCardProps {
  user: User;
  entity: CounterpartyRole;
}
export const UserCard = ({ user, entity }: UserCardProps) => {
  const title = entity === 'receiver' ? 'Получатель' : 'Кто выдал';
  return (
    <Flex vertical>
      <Typography.Title className={styles.title} level={2}>
        {title}
      </Typography.Title>
      <Flex gap={10} align="center">
        <div className={styles.bgIcon}>
          <PiUserBold className={styles.icon} />
        </div>
        <div className={styles.userInfo}>
          <div className={styles.name}>
            {user.lastNameRu} {user.firstNameRu}
          </div>
          <div className={styles.department}>{user.department?.name}</div>
        </div>
      </Flex>
      <Divider style={{ margin: '10px 0px' }} />
      <div className={styles.block}>
        <div className={styles.label}>{LABELS.email}</div>
        <div className={styles.value}>{user.email}</div>
      </div>
      <div className={styles.block}>
        <div className={styles.label}>{LABELS.workID}</div>
        <div className={styles.value}>{user.workId}</div>
      </div>
    </Flex>
  );
};
