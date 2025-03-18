import ItemsList from '../ItemsList';
import MultiForm from '../../../forms/multi/MultiAdminForm';
import { useGetLocationsQuery } from '../../../../store/api/locationApi';
import { useAddAdminEntities } from '../../../../hooks/data/useAddAdminEntities';
import styles from "../Admin.module.scss";

const AddCity = () => {
    const { handleUpdateEntity } = useAddAdminEntities();
    const { data: cities } = useGetLocationsQuery();
    return (
        <section className={styles.inner}>
          <div className={styles.form}>
            <MultiForm />
          </div>
          <aside className={styles.list}>
            <ItemsList
              field="location"
              items={cities || []} 
              handle={(id, field) => handleUpdateEntity(id, field)} 
            />
          </aside>
        </section>
      );
};

export default AddCity;