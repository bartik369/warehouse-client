import { IUserRolesResponse } from "../../../../types/access";
import TechnicalOptions from "../../../ui/options/TechnicalOptions";
import PermissionList from "../../../ui/permissions/PermissionList";
import styles from "./GrantUserRoles.module.scss";

interface IUserInfoProps {
  userRoles: IUserRolesResponse;
}
const UserInfo = ({ userRoles }: IUserInfoProps) => {
  const { user, roles } = userRoles;
  return (
    <div className={styles.userInfo}>
      {user.email && (
        <>
          <div className={styles.user}>
            <div className={styles.name}>
              {user.firstNameRu} {user.lastNameRu}
            </div>
            <div className={styles.extraName}>
              {user.firstNameEn} {user.lastNameEn}
            </div>
            <TechnicalOptions name="Почта" value={user?.email ?? ""} />
            <TechnicalOptions name="Имя пользователя" value={user?.userName ?? ""}/>
            <TechnicalOptions name="work-ID" value={user?.workId ?? ""} />
            <TechnicalOptions name="Отдел" value={user?.department ?? ""} />
            <TechnicalOptions name="Город" value={user?.location ?? ""} />
          </div>
          <div className={styles.title}>Список ролей пользователя</div>
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
