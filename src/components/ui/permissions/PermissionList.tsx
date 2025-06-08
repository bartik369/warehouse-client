import { MdOutlineEdit } from 'react-icons/md';
import { IAccessFormActions, IUserRolesList } from '../../../types/access';
import styles from './PermissionList.module.scss';
import { RiDeleteBin4Line } from 'react-icons/ri';

interface IPermissionListProps {
    role: IUserRolesList;
    actions?: IAccessFormActions;
}

const PermissionList = ({ role, actions  }: IPermissionListProps) => {
    console.log(role)
    return (
        <div className={styles.item} 
          key={`${role.roleName}_${role.locationName}_${role.warehouseName}`}>
            <div className={styles.info}>
              <div className={styles.title}>{role.roleName}</div>
              <div className={styles.text}>
                {role.warehouseName}<span>{role.locationName}</span>
              </div>
              {role.warehouseName && role.permissionsName?.length && (
                <div className={styles.permissions}>
                  {role.permissionsName &&
                    role.permissionsName.map((permission, index) => <span key={index}>{permission}</span>)}
                </div>
              )}
            </div>
            <div className={styles.actions}>
              <button 
              className={styles.btn}
              onClick={() => actions?.handleRoleInfo(role)}
              >
                <MdOutlineEdit />
              </button>
              <button 
              className={styles.btn}
              onClick={() => actions?.handleDeleteRolePerms(role)}
              >
                <RiDeleteBin4Line />
              </button>
            </div>
          </div>
    );
};

export default PermissionList;