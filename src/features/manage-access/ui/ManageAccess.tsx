import { Flex } from 'antd';

import { useManageAccess } from '../model/useManageAccess';
import styles from './ManageAccess.module.scss';
import { AccessForm } from './form/AccessForm';
import { UserAccessCard } from './user-access-card/UserAccessCard';

export const ManageAccess = () => {
  const {
    roles,
    userRoles,
    userListOptions,
    userListLoading,
    wasSearched,
    onSave,
    onSelect,
    onUserSearch,
  } = useManageAccess();
  return (
    <Flex gap={20} className={styles.page} wrap>
      <div className={styles.formColumn}>
        <AccessForm
          onSave={onSave}
          onOptionSelect={onSelect}
          onUserSearch={onUserSearch}
          roles={roles}
          userListOptions={userListOptions}
          loading={userListLoading}
          searched={wasSearched}
        />
      </div>
      <div className={styles.listColumn}>
        {userRoles && userRoles.roles.length > 0 && <UserAccessCard userRoles={userRoles} />}
      </div>
    </Flex>
  );
};
