import UserInfo from "./UserInfo";
import { useUserRoles } from "../../../../hooks/data/useUserRoles";
import UserRolesForm from "../../../forms/roles/UserRolesForm";
import { grantAccess } from "../../../../utils/constants/constants";
import { useGetRolesListQuery } from "../../../../store/api/rolesApi";
import styles from './GrantUserRoles.module.scss';


const GrantUserRoles = () => {
  const { actions, roleState, userState } = useUserRoles();
  const { data: roles, isFetching, isSuccess } = useGetRolesListQuery();

  console.log(roles)
  return (
    <section className={styles.inner}>
      <section className={styles.layoutLeft}>
        <UserRolesForm
          roles={roles || []}
          actions={actions}
          state={roleState}
          userState={userState.users}
          title={grantAccess}
          isFetching={isFetching}
          isSuccess={isSuccess}
        />
      </section>
      <section className={styles.layoutRight}>
        <UserInfo userRoles={roleState.assignedUserRoles}/>
      </section>
    </section>
  );
};

export default GrantUserRoles;
