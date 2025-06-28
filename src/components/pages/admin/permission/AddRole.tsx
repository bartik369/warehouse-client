import ItemsList from '../ItemsList';
import MultiForm from '../../../forms/multi/MultiForm';
import { roleFormFields } from '../../../forms/multi/formConfigs/modelFormFields';
import { useGetRolesQuery } from '../../../../store/api/rolesApi';
import { useAddAdminEntities } from '../../../../hooks/data/useAddAdminEntities';
import { SECTION_TITLES } from '../../../../utils/constants/ui/titles';
import styles from '../Admin.module.scss';

const AddRole = () => {
  const {data: roles} = useGetRolesQuery();
    const { actions, state } = useAddAdminEntities();
      return (
        <section className={styles.inner}>
          <div className={styles.form}>
            <MultiForm
              fields={roleFormFields}
              title={SECTION_TITLES.addRole}
              actions={actions}
              state={state}
              locationType="role"
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