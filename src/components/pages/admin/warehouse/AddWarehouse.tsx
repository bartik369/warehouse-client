import ItemsList from "../ItemsList";
import { useGetWarehousesQuery } from "../../../../store/api/warehousesApi";
import LocationForm from "../../../forms/location/LocationForm";
import { useAddLocation } from "../../../../hooks/data/useAddLocation";
import styles from "../Admin.module.scss";

const AddWarehouse = () => {
  const {data: warehouses} = useGetWarehousesQuery();
  const {handleUpdateLocation} = useAddLocation();

  return (
    <section className={styles.inner}>
      <div className={styles.form}>
        <LocationForm />
      </div>
      <aside className={styles.list}>
      <ItemsList items={warehouses || []} handle={handleUpdateLocation}/>
      </aside>
    </section>
  );
};

export default AddWarehouse;
