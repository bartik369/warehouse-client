import LocationForm from "../../../forms/location/LocationForm";
import { useAddLocation } from "../../../../hooks/data/useAddLocation";
import { useGetDepartmentsQuery } from "../../../../store/api/departmentApi";
import ItemsList from "../ItemsList";
import styles from "../Admin.module.scss";

const AddDepartment = () => {
  const { handleUpdateLocation } = useAddLocation();
  const { data: departments } = useGetDepartmentsQuery();
  return (
    <section className={styles.inner}>
      <div className={styles.form}>
        <LocationForm />
      </div>
      <aside className={styles.list}>
        <ItemsList items={departments || []} handle={handleUpdateLocation} />
      </aside>
    </section>
  );
};

export default AddDepartment;
