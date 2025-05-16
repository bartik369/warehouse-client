import { memo } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin4Line } from "react-icons/ri";
import { IAccessFormActions, IPermissionRoleRes } from "../../../../types/access";
import styles from "./PermissionsRoleList.module.scss";

interface IPermissionsRoleListProps {
  roles: IPermissionRoleRes[];
  actions: IAccessFormActions;
}
const PermissionsRoleList = memo(({ roles, actions }: IPermissionsRoleListProps) => {

  return (
    <div className={styles.items}>
      {roles &&
        roles.map((role) => (
          <div className={styles.item} 
          key={`${role.roleName}_${role.locationName}_${role.warehouseName}`}>
            <div className={styles.info}>
              <div className={styles.title}>{role.roleName}</div>
              <div className={styles.text}>
                {role.warehouseName}<span>{role.locationName}</span>
              </div>
              {role.warehouseName && role.permissionName.length > 0 && (
                <div className={styles.permissions}>
                  {role.permissionName &&
                    role.permissionName.map((permission, index) => <span key={index}>{permission}</span>)}
                </div>
              )}
            </div>
            <div className={styles.actions}>
              <button 
              className={styles.btn}
              onClick={() => actions.handleRoleInfo(role)}
              >
                <MdOutlineEdit />
              </button>
              <button 
              className={styles.btn}
              onClick={() => actions.handleDeleteRolePerms(role)}
              >
                <RiDeleteBin4Line />
              </button>
            </div>
          </div>
        ))}
    </div>
  );
});

export default PermissionsRoleList;
