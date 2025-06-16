import { memo } from 'react';
import PermissionList from '../../../ui/permissions/PermissionList';
import { AccessFormActions, UserRolesList } from '../../../../types/access';
import styles from './PermissionsRoleList.module.scss';

interface PermissionsRoleListProps {
  roles: UserRolesList[];
  actions: AccessFormActions;
}
const PermissionsRoleList = memo(
  ({ roles, actions }: PermissionsRoleListProps) => {
    return (
      <div className={styles.items}>
        {roles &&
          roles.map((role) => (
            <PermissionList
              key={`${role.roleName}_${role.locationName}_${role.warehouseName}`}
              role={role}
              actions={actions}
              showEdit={true}
              showDelete={true}
            />
          ))}
      </div>
    );
  }
);

export default PermissionsRoleList;
