import { Card, Flex, Typography } from 'antd';

import { EquipmentIssuance } from '@/features/issue-device/model/types';
import { formatDate } from '@/utils/date/dateUtils';

import styles from '../EquipmentIssuanceInfo.module.scss';
import { UserCard } from './UserCard';

interface IssueProcessDetailsProps {
  detail: EquipmentIssuance;
}

export const IssueProcessDetails = ({ detail }: IssueProcessDetailsProps) => {
  return (
    <Flex className={styles.content}>
      <Card>
        <UserCard user={detail.user} entity="receiver" />
      </Card>
      <Card>
        <UserCard user={detail.issuedBy} entity="issuer" />
      </Card>
      <Card>
        <Flex vertical>
          <Typography.Title className={styles.title} level={2}>
            Дополнительно
          </Typography.Title>
          <div className={styles.block}>
            <div className={styles.label}>Процесс создан</div>
            <div className={styles.value}>{formatDate(detail.createdAt)}</div>
          </div>
          <div className={styles.block}>
            <div className={styles.label}>Процесс завершен</div>
            <div className={styles.value}>{formatDate(detail.updatedAt)}</div>
          </div>
        </Flex>
      </Card>
    </Flex>
  );
};
