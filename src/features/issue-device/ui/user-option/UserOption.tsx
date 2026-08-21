import { User } from '@/entities/user/model/types';

import styles from './UserOption.module.scss';

interface UserOptionProps {
  user: User;
}
export const UserOption = ({ user }: UserOptionProps) => {
  const userInitials = `${user.lastNameRu[0]}${user.firstNameRu[0]}`;
  return (
    <div className={styles.userOption}>
      <div className={styles.userInfo}>
        <div className={styles.initials}>{userInitials}</div>
        <div className={styles.userContent}>
          <div className={styles.fullName}>
            <span>{user.lastNameRu}</span>
            <span>{user.firstNameRu}</span>
          </div>
          <span className={styles.email}>{user.email}</span>
        </div>
      </div>
      <div className={styles.employeeInfo}>
        <span className={styles.department}>{user.department?.name}</span>
        <span className={styles.workId}>{user.workId}</span>
      </div>
    </div>
  );
};
