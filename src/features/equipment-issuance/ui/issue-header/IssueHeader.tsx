import { Flex, Typography } from 'antd';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';

import { EquipmentIssuance } from '@/features/issue-device/model/types';
import { formatDate } from '@/shared/lib/date/formatDate';
import { CustomTag } from '@/shared/ui/custom-tag/CustomTag';

import styles from './IssueHeader.module.scss';

interface IssueHeaderProps {
  detail: EquipmentIssuance;
}
export const IssueHeader = ({ detail }: IssueHeaderProps) => {
  const issueTime = formatDate(detail?.updatedAt, 'datetime');
  return (
    <Flex gap={10} className={styles.header}>
      <div className={styles.info}>
        <div className={styles.title}>
          <Typography.Title className={styles.title} level={4}>
            Выдача устройств {detail?.documentNo}
          </Typography.Title>
          <div className={styles.subtitle}>Завершена {issueTime}</div>
        </div>
        <CustomTag title="Выдано" icon={IoCheckmarkCircleOutline} variant="success" />
      </div>
    </Flex>
  );
};
