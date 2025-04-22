import ItemsList from '../ItemsList';
import MultiForm from '../../../forms/multi/MultiForm';
import { useGetPermissionsQuery } from '../../../../store/api/permissionApi';
import { useAddAdminEntities } from '../../../../hooks/data/useAddAdminEntities';
import { addPermissionTitle } from '../../../../utils/constants/constants';
import styles from '../Admin.module.scss';
import { permissionFormFields } from '../../../forms/multi/formConfigs/modelFormFields';

const AddPermission = () => {
  const {data: permissions} = useGetPermissionsQuery()
      const { actions, state } = useAddAdminEntities();
      return (
        <section className={styles.inner}>
          <div className={styles.form}>
            <MultiForm
              fields={permissionFormFields}
              title={addPermissionTitle}
              actions={actions}
              state={state}
            />
          </div>
          <aside className={styles.list}>
            <ItemsList
              field="permission"
              items={permissions || []}
              actions={actions}
            />
          </aside>
        </section>
      );
};

export default AddPermission;