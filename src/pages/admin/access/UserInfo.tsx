import TechnicalOptions from '@/components/ui/options/TechnicalOptions';
import { UserRolesResponse } from '@/entities/permission-role/model/types';
import { PermissionList } from '@/features/manage-permission-role/ui/permission-role-list/PermissionList';
import { LABELS } from '@/utils/constants/ui/labels';
import { SECTION_TITLES } from '@/utils/constants/ui/titles';

import styles from './GrantUserRoles.module.scss';

interface UserInfoProps {
  userRoles: UserRolesResponse;
}
const UserInfo = ({ userRoles }: UserInfoProps) => {
  const { user, roles } = userRoles;
  return (
    <div className={styles.userInfo}>
      {user.email && (
        <>
          <section className={styles.user}>
            <h3 className={styles.name}>
              {user.firstNameRu} {user.lastNameRu}
            </h3>
            <div className={styles.extraName}>
              {user.firstNameEn} {user.lastNameEn}
            </div>
            <TechnicalOptions name={LABELS.email} value={user?.email ?? ''} />
            <TechnicalOptions name={LABELS.login} value={user?.userName ?? ''} />
            <TechnicalOptions name={LABELS.workID} value={user?.workId ?? ''} />
            <TechnicalOptions name={LABELS.department} value={user?.department ?? ''} />
            <TechnicalOptions name={LABELS.location} value={user?.location ?? ''} />
          </section>
          <div className={styles.title}>{SECTION_TITLES.userListRoles}</div>
          {/* <PermissionList roles={roles} /> */}
        </>
      )}
    </div>
  );
};

export default UserInfo;
