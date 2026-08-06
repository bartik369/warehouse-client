import { Flex, Tag } from 'antd';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';

import { User } from '@/entities/ user/model/types';
import { Warehouse } from '@/entities/warehouse/model/types';
import { CustomTag } from '@/shared/ui/custom-tag/CustomTag';
import { LABELS } from '@/utils/constants/ui/labels';

import styles from './ IssueSummary.module.scss';

interface IssueSummaryProps {
  user: User | null;
  warehouse: Warehouse | null;
}
export const IssueSummary = ({ user, warehouse }: IssueSummaryProps) => {
  const userInitials = `${user?.lastNameRu[0]}${user?.firstNameRu[0]}`;

  return (
    <Flex gap={50}>
      <div className={styles.user}>
        <div className={styles.userInfo}>
          <div className={styles.initials}>{userInitials}</div>
          <div className={styles.userContent}>
            <div className={styles.fullName}>
              <div className={styles.content}>
                <span>{user?.lastNameRu}</span>
                <span>{user?.firstNameRu}</span>
              </div>
              <CustomTag
                icon={IoCheckmarkCircleOutline}
                title={user?.isActive ? 'Активен' : 'Неактивен'}
                variant={user?.isActive ? 'success' : 'error'}
                iconSize={15}
              />
            </div>
            <span className={styles.email}>{user?.email}</span>
          </div>
        </div>
        <div className={styles.employeeInfo}>
          <span className={styles.label}>{LABELS.workID}</span>
          <span className={styles.value}>{user?.workId}</span>
        </div>
      </div>
      <Flex vertical>
        <span className={styles.label}>{LABELS.warehouse}</span>
        <span className={styles.value}>{warehouse?.name}</span>
      </Flex>
      <Flex vertical>
        <span className={styles.label}>{LABELS.location}</span>
        <span className={styles.value}>{warehouse?.name}</span>
      </Flex>
    </Flex>
  );
};
