import ItemsList from "../ItemsList";
import MultiForm from "../../../forms/multi/MultiAdminForm";
import { useAddAdminEntities } from "../../../../hooks/data/useAddAdminEntities";
import { useGetDepartmentsQuery } from "../../../../store/api/departmentApi";
import styles from "../Admin.module.scss";

const AddDepartment = () => {
  const { handleUpdateEntity } = useAddAdminEntities();
  const { data: departments } = useGetDepartmentsQuery();
  return (
    <section className={styles.inner}>
      <div className={styles.form}>
        <MultiForm />
      </div>
      <aside className={styles.list}>
            <ItemsList
          items={departments || []} 
          field="department"
          handle={(id, field) => handleUpdateEntity(id, field)} 
        />
      </aside>
    </section>
  );
};

export default AddDepartment;
