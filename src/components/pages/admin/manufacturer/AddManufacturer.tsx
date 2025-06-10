import ItemsList from '../ItemsList';
import MultiForm from '../../../forms/multi/MultiForm';
import { useAddAdminEntities } from '../../../../hooks/data/useAddAdminEntities';
import { useGetManufacturersQuery } from '../../../../store/api/manufacturersApi';
import { addManufacturerTitle } from '../../../../utils/constants/constants';
import { manufacturerFormFields } from '../../../forms/multi/formConfigs/modelFormFields';
import styles from '../Admin.module.scss';

const AddManufacturer = () => {
  const {state, actions} = useAddAdminEntities();
  const { data: manufacturers } = useGetManufacturersQuery();
  return (
    <section className={styles.inner}>
      <div className={styles.form}>
        <MultiForm
          fields={manufacturerFormFields}
          title={addManufacturerTitle}
          actions={actions}
          state={state}
          locationType="manufacturer"
        />
      </div>
      <aside className={styles.list}>
        <ItemsList
          field="manufacturer"
          items={manufacturers || []}
          actions={actions}
        />
      </aside>
    </section>
  );
};

export default AddManufacturer;