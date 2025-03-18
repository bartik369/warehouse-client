import ItemsList from "../ItemsList";
import MultiForm from "../../../forms/multi/MultiAdminForm";
import { useAddAdminEntities } from "../../../../hooks/data/useAddAdminEntities";
import { useGetManufacturersQuery } from "../../../../store/api/devicesApi";
import styles from "../Admin.module.scss";

const AddManufacturer = () => {
    const { handleUpdateEntity } = useAddAdminEntities();
    const { data: manufacturers } = useGetManufacturersQuery();
    return (
        <section className={styles.inner}>
          <div className={styles.form}>
            <MultiForm />
          </div>
          <aside className={styles.list}>
            <ItemsList
              field="manufacturer"
              items={manufacturers || []} 
              handle={(id, field) => handleUpdateEntity(id, field)} 
            />
          </aside>
        </section>
      );
};

export default AddManufacturer;