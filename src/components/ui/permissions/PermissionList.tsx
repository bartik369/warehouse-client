import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin4Line } from "react-icons/ri";
import { IAccessFormActions, IUserRolesList } from "../../../types/access";
import styles from "./PermissionList.module.scss";

interface IPermissionListProps {
  role: IUserRolesList;
  actions?: IAccessFormActions;
  showEdit?: boolean;
  showDelete?: boolean;
}

const PermissionList = ({
  role,
  actions,
  showEdit,
  showDelete,
}: IPermissionListProps) => {
  return (
    <div
      className={styles.item}
      key={`${role.roleName}_${role.locationName}_${role.warehouseName}`}
    >
      <div className={styles.info}>
        <div className={styles.title}>{role.roleName}</div>
        <div className={styles.text}>
          {role.warehouseName}
          <span>{role.locationName}</span>
        </div>
        {role.warehouseName && role.permissionsName?.length && (
          <div className={styles.permissions}>
            {role.permissionsName &&
              role.permissionsName.map((permission, index) => (
                <span key={index}>{permission}</span>
              ))}
          </div>
        )}
      </div>
      <div className={styles.actions}>
        {showEdit && (
          <button
            className={styles.btn}
            onClick={() => actions?.handleRoleInfo(role)}
          >
            <MdOutlineEdit />
          </button>
        )}
        {showDelete && (
          <button
            className={`${styles.btn} ${styles.delete}`}
            onClick={() => actions?.handleDeleteRolePerms(role)}
          >
            <RiDeleteBin4Line />
          </button>
        )}
      </div>
    </div>
  );
};

export default PermissionList;
