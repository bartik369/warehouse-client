import { useUserRoles } from "../../../../hooks/data/useUserRoles";
import UserRolesForm from "../../../forms/roles/UserRolesForm";
import UserInfo from "./UserInfo";
import { useGetPermissionsRolesQuery } from "../../../../store/api/permissionApi";
import styles from './GrantUserRoles.module.scss';


const GrantUserRoles = () => {
  const { actions, roleState, userState } = useUserRoles();
  const { data: roles } = useGetPermissionsRolesQuery();
  return (
    <div className={styles.test}>
      <div className={styles.layoutLeft}>
        <UserRolesForm
          roles={roles || []}
          actions={actions}
          state={roleState}
          userState={userState.users}
          title="Grant access"
        />
      </div>
      <div className={styles.layoutRight}>
        <UserInfo />
      </div>
    </div>
  );
};

export default GrantUserRoles;
