import ItemsList from '../ItemsList';
import MultiForm from '../../../forms/multi/MultiForm';
import { roleFormFields } from '../../../forms/multi/formConfigs/modelFormFields';
import { useGetRolesQuery } from '../../../../store/api/rolesApi';
import { useAddAdminEntities } from '../../../../hooks/data/useAddAdminEntities';
import { addRoleTitle } from '../../../../utils/constants/constants';
import styles from '../Admin.module.scss';

const AddRole = () => {
  const {data: roles} = useGetRolesQuery();
    const { actions, state } = useAddAdminEntities();
      return (
        <section className={styles.inner}>
          <div className={styles.form}>
            <MultiForm
              fields={roleFormFields}
              title={addRoleTitle}
              actions={actions}
              state={state}
            />
          </div>
          <aside className={styles.list}>
            <ItemsList
              field="role"
              items={roles || []}
              actions={actions}
            />
          </aside>
        </section>
      );
};

export default AddRole;