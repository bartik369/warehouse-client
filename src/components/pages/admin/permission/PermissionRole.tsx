import AccessForm from '../../../forms/access/AccessForm';
import PermissionsRoleList from './PermissionsRoleList';
import { usePermission } from '../../../../hooks/data/usePermission';
import { useGetPermissionsRolesQuery } from '../../../../store/api/permissionApi';
import { SECTION_TITLES } from '../../../../utils/constants/ui/titles';
import styles from '../Admin.module.scss';

const PermissionRole = () => {
      const {
        entity,
        state,
        isUpdate,
        actions,
      } = usePermission();
    const { data: permissionsRoles } = useGetPermissionsRolesQuery();
    return (
        <section className={styles.inner}>
          <div className={styles.form}>
           <AccessForm
            title={SECTION_TITLES.addRolePermission}
            state={state}
            entity={entity}
            isUpdate={isUpdate}
            actions={actions}
           />
          </div>
          <aside className={styles.list}>
            <PermissionsRoleList
               roles={permissionsRoles || []}
               actions={actions}
             />
          </aside>
        </section>
    )
};

export default PermissionRole;