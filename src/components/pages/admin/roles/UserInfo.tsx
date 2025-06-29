import { UserRolesResponse } from "@/types/access";
import { LABELS } from "@/utils/constants/ui/labels";
import { SECTION_TITLES } from "@/utils/constants/ui/titles";
import TechnicalOptions from "@/components/ui/options/TechnicalOptions";
import PermissionList from "@/components/ui/permissions/PermissionList";
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
            <TechnicalOptions name={LABELS.email} value={user?.email ?? ""} />
            <TechnicalOptions name={LABELS.login} value={user?.userName ?? ""}/>
            <TechnicalOptions name={LABELS.workID} value={user?.workId ?? ""} />
            <TechnicalOptions name={LABELS.department} value={user?.department ?? ""} />
            <TechnicalOptions name={LABELS.location} value={user?.location ?? ""} />
          </section>
          <div className={styles.title}>{SECTION_TITLES.userListRoles}</div>
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
