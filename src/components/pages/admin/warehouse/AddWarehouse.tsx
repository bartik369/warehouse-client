import ItemsList from "../ItemsList";
import { useGetWarehousesQuery } from "../../../../store/api/warehousesApi";
import MultiForm from "../../../forms/multi/MultiAdminForm";
import { useAddAdminEntities } from "../../../../hooks/data/useAddAdminEntities";
import styles from "../Admin.module.scss";

const AddWarehouse = () => {
  const { data: warehouses } = useGetWarehousesQuery();
  const { handleUpdateEntity } = useAddAdminEntities();

  return (
    <section className={styles.inner}>
      <div className={styles.form}>
        <MultiForm />
      </div>
      <aside className={styles.list}>
        <ItemsList
          field="warehouse"
          items={warehouses || []}
          handle={(id, field) => handleUpdateEntity(id, field)}
        />
      </aside>
    </section>
  );
};

export default AddWarehouse;
