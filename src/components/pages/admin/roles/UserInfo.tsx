import { UserRolesResponse } from "../../../../types/access";
import { department, email, login, userListRoles, workID } from "../../../../utils/constants/constants";
import { location } from "../../../../utils/constants/device";
import TechnicalOptions from "../../../ui/options/TechnicalOptions";
import PermissionList from "../../../ui/permissions/PermissionList";
import styles from "./GrantUserRoles.module.scss";

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
            <TechnicalOptions name={email} value={user?.email ?? ""} />
            <TechnicalOptions  name={login} value={user?.userName ?? ""}/>
            <TechnicalOptions name={workID} value={user?.workId ?? ""} />
            <TechnicalOptions name={department} value={user?.department ?? ""} />
            <TechnicalOptions name={location} value={user?.location ?? ""} />
          </section>
          <div className={styles.title}>{userListRoles}</div>
          {roles.map((role) => (
            <PermissionList 
              role={role} 
              key={`${role.locationName}::${role.warehouseName}::${role.roleName}`}
              showEdit={false}
              showDelete={true}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default UserInfo;
