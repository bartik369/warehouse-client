import { Card, Empty, Flex } from 'antd';

import { PageHeader } from '@/shared/ui/page-header/PageHeader';
import { Spinner } from '@/shared/ui/spinner/Spinner';

import { DESCRIPTION, TITLE } from '../model/constants';
import { useManageAccess } from '../model/useManageAccess';
import styles from './ManageAccess.module.scss';
import { AccessForm } from './form/AccessForm';
import { UserAccessCard } from './user-access-card/UserAccessCard';

export const ManageAccess = () => {
  const {
    mode,
    roles,
    userRoles,
    selectedUser,
    userListOptions,
    userListLoading,
    rolesLoading,
    isGrantLoading,
    isRevokeLoading,
    deletingId,
    isSuccess,
    wasSearched,
    onSave,
    onSelect,
    onUserSearch,
    onUserClear,
    onDelete,
  } = useManageAccess();
  return (
    <Flex vertical>
      <PageHeader title={TITLE} description={DESCRIPTION} />
      <Flex className={styles.container}>
        <Card className={styles.card}>
          <AccessForm
            mode={mode}
            selectedUser={selectedUser}
            roles={roles}
            userRoles={userRoles?.roles}
            userListOptions={userListOptions}
            loading={userListLoading}
            grantLoading={isGrantLoading}
            searched={wasSearched}
            onSave={onSave}
            onOptionSelect={onSelect}
            onUserSearch={onUserSearch}
            onUserClear={onUserClear}
          />
        </Card>

        {rolesLoading ? (
          <Spinner />
        ) : selectedUser && isSuccess ? (
          <Card className={styles.card}>
            <UserAccessCard
              deletingId={deletingId}
              userRoles={userRoles?.roles ?? []}
              user={selectedUser}
              loading={isRevokeLoading}
              onDelete={onDelete}
            />
          </Card>
        ) : null}
      </Flex>
    </Flex>
  );
};
