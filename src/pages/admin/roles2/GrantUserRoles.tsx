import UserRolesForm from '@/components/forms/roles/UserRolesForm';
import { useUserRoles } from '@/hooks/data/useUserRoles';
import { useGetRolesListQuery } from '@/store/api/rolesApi';
import { SECTION_TITLES } from '@/utils/constants/ui/titles';

import styles from './GrantUserRoles.module.scss';
import UserInfo from './UserInfo';

const GrantUserRoles = () => {
  const { actions, roleState } = useUserRoles();
  const { data: roles, isFetching, isSuccess } = useGetRolesListQuery();

  return (
    <section className={styles.inner}>
      <section className={styles.layoutLeft}>
        <UserRolesForm
          roles={roles || []}
          actions={actions}
          state={roleState}
          title={SECTION_TITLES.grantAccess}
          isFetching={isFetching}
          isSuccess={isSuccess}
        />
      </section>
      <section className={styles.layoutRight}>
        {/* <UserInfo userRoles={roleState.assignedUserRoles} /> */}
      </section>
    </section>
  );
};

export default GrantUserRoles;
