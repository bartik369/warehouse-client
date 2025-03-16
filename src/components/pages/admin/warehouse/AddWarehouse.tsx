import LocationForm from "../../../forms/location/LocationForm";
import WarehouseList from "./WarehouseList";
import styles from "../Admin.module.scss";

const AddWarehouse = () => {
  return (
    <section className={styles.inner}>
      <div className={styles.form}>
        <LocationForm />
      </div>
      <aside className={styles.list}>
        <WarehouseList />
      </aside>
    </section>
  );
};

export default AddWarehouse;
