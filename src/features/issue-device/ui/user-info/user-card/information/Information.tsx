import { Flex, Tag } from 'antd';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';

import { User } from '@/entities/user/model/types';
import { CustomTag } from '@/shared/ui/custom-tag/CustomTag';
import { LABELS } from '@/utils/constants/ui/labels';

import styles from './Information.module.scss';

interface InformationProps {
  user: User;
}

export const Information = ({ user }: InformationProps) => {
  const userInitials = `${user.lastNameRu[0]}${user.firstNameRu[0]}`;

  return (
    <Flex vertical gap={30}>
      <div className={styles.user}>
        <div className={styles.userInfo}>
          <div className={styles.initials}>{userInitials}</div>
          <div className={styles.userContent}>
            <div className={styles.fullName}>
              <div className={styles.content}>
                <span>{user.lastNameRu}</span>
                <span>{user.firstNameRu}</span>
              </div>
            </div>
            <span className={styles.email}>{user.email}</span>
          </div>
          <CustomTag
            icon={IoCheckmarkCircleOutline}
            title={user.isActive ? 'Активен' : 'Неактивен'}
            variant={user.isActive ? 'success' : 'error'}
          />
        </div>
        <div className={styles.employeeInfo}>
          <span className={styles.label}>{LABELS.workID}</span>
          <span className={styles.value}>{user.workId}</span>
        </div>
      </div>
      <div className={styles.details}></div>
    </Flex>
  );
};
