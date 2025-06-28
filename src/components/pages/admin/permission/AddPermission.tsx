import ItemsList from '../ItemsList';
import MultiForm from '../../../forms/multi/MultiForm';
import { useGetPermissionsQuery } from '../../../../store/api/permissionApi';
import { useAddAdminEntities } from '../../../../hooks/data/useAddAdminEntities';
import { permissionFormFields } from '../../../forms/multi/formConfigs/modelFormFields';
import { SECTION_TITLES } from '../../../../utils/constants/ui/titles';
import styles from '../Admin.module.scss';

const AddPermission = () => {
  const {data: permissions} = useGetPermissionsQuery()
      const { actions, state } = useAddAdminEntities();
      return (
        <section className={styles.inner}>
          <section className={styles.form}>
            <MultiForm
              fields={permissionFormFields}
              title={SECTION_TITLES.addPermission}
              actions={actions}
              state={state}
              locationType="permission"
            />
          </section>
          <section className={styles.list}>
            <ItemsList
              field="permission"
              items={permissions || []}
              actions={actions}
            />
          </section>
        </section>
      );
};

export default AddPermission;