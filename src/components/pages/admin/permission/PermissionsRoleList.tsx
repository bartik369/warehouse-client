import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin4Line } from "react-icons/ri";
import { IPermissionRoleRes } from "../../../../types/access";
import styles from "./PermissionsRoleList.module.scss";

interface IPermissionsRoleListProps {
  roles: IPermissionRoleRes[];
}
const PermissionsRoleList = ({ roles }: IPermissionsRoleListProps) => {
  console.log(roles)
  return (
    <div className={styles.items}>
      {roles &&
        roles.map((role) => (
          <div className={styles.item} key={role.roleName}>
            <div className={styles.info}>
            <div className={styles.title}>
              {role.roleName}
              <span>({role.locationName})</span>
            </div>
            <div className={styles.text}>{role.warehouseName}</div>
            <div className={styles.permissions}>
              {role.permissionName &&
                role.permissionName.map((p, i) => <span key={i}>{p}</span>)}
            </div>
            </div>
            <div className={styles.actions}>
            <button className={styles.btn}>
              <MdOutlineEdit />
            </button>
            <button className={styles.btn}>
                <RiDeleteBin4Line />
              </button>
          </div>
          </div>
        ))}
    </div>
  );
};

export default PermissionsRoleList;
