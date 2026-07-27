import { Empty, Flex } from 'antd';

import { Spinner } from '@/shared/ui/spinner/Spinner';

import { useManageAccess } from '../model/useManageAccess';
import styles from './ManageAccess.module.scss';
import { AccessForm } from './form/AccessForm';
import { UserAccessCard } from './user-access-card/UserAccessCard';

export const ManageAccess = () => {
  const {
    roles,
    userRoles,
    selectedUser,
    userListOptions,
    userListLoading,
    rolesLoading,
    isSuccess,
    wasSearched,
    onSave,
    onSelect,
    onUserSearch,
    onUserClear,
  } = useManageAccess();
  return (
    <Flex gap={20} className={styles.page} wrap>
      <div className={styles.formColumn}>
        <AccessForm
          selectedUser={selectedUser}
          roles={roles}
          userRoles={userRoles?.roles}
          userListOptions={userListOptions}
          loading={userListLoading}
          searched={wasSearched}
          onSave={onSave}
          onOptionSelect={onSelect}
          onUserSearch={onUserSearch}
          onUserClear={onUserClear}
        />
      </div>
      <div className={styles.listColumn}>
        {rolesLoading ? (
          <Spinner />
        ) : selectedUser && isSuccess && userRoles ? (
          userRoles.roles.length > 0 ? (
            <UserAccessCard userRoles={userRoles} />
          ) : (
            <Empty />
          )
        ) : null}
      </div>
    </Flex>
  );
};
