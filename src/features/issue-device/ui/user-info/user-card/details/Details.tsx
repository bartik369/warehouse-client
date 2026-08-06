import { User } from '@/entities/ user/model/types';
import { formatDate } from '@/shared/lib/date/formatDate';
import { LABELS } from '@/utils/constants/ui/labels';

import styles from './Details.module.scss';

interface DetailsProps {
  user: User;
}

export const Details = ({ user }: DetailsProps) => {
  return (
    <div className={styles.details}>
      <div className={styles.detail}>
        <span className={styles.detailLabel}>{LABELS.location}</span>
        <span className={styles.detailValue}>{user.location}</span>
      </div>
      <div className={styles.detail}>
        <span className={styles.detailLabel}>{LABELS.department}</span>
        <span className={styles.detailValue}>{user.department}</span>
      </div>
      <div className={styles.detail}>
        <span className={styles.detailLabel}>{LABELS.login}</span>
        <span className={styles.detailValue}>{user.userName}</span>
      </div>
      <div className={styles.detail}>
        <span className={styles.detailLabel}>{LABELS.workFrom}</span>
        <span className={styles.detailValue}>{formatDate(user.createdAt)}</span>
      </div>
    </div>
  );
};
