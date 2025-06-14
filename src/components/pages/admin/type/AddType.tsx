import ItemsList from '../ItemsList';
import MultiForm from '../../../forms/multi/MultiForm';
import { useGetTypesQuery } from '../../../../store/api/typesApi';
import { useAddAdminEntities } from '../../../../hooks/data/useAddAdminEntities';
import { typeFormFields } from '../../../forms/multi/formConfigs/modelFormFields';
import { addTypeTitle } from '../../../../utils/constants/constants';
import styles from '../Admin.module.scss';

const AddType = () => {
    const { actions, state } = useAddAdminEntities();
      const { data: types } = useGetTypesQuery();
      return (
        <section className={styles.inner}>
          <div className={styles.form}>
            <MultiForm
              title={addTypeTitle}
              fields={typeFormFields}
              actions={actions}
              state={state}
              locationType="type"
            />
          </div>
          <aside className={styles.list}>
            <ItemsList
              field="type"
              items={types || []}
              actions={actions}
            />
          </aside>
        </section>
      );
};

export default AddType;