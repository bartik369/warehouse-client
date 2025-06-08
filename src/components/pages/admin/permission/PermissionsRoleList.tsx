import { memo } from 'react';
import PermissionList from '../../../ui/permissions/PermissionList';
import {
  IAccessFormActions,
  IUserRolesList,
} from '../../../../types/access';
import styles from './PermissionsRoleList.module.scss';

interface IPermissionsRoleListProps {
  roles: IUserRolesList[];
  actions: IAccessFormActions;
}
const PermissionsRoleList = memo(
  ({ roles, actions }: IPermissionsRoleListProps) => {
    return (
      <div className={styles.items}>
        {roles &&
          roles.map((role) => (
            <PermissionList
              key={`${role.roleName}_${role.locationName}_${role.warehouseName}`}
              role={role}
              actions={actions}
            />
          ))}
      </div>
    );
  }
);

export default PermissionsRoleList;
