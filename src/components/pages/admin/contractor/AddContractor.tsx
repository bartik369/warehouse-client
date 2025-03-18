import ItemsList from "../ItemsList";
import { useAddAdminEntities } from "../../../../hooks/data/useAddAdminEntities";
import { useGetContractorsQuery } from "../../../../store/api/contractorApi";
import styles from "../Admin.module.scss";
import MultiForm from "../../../forms/multi/MultiAdminForm";

const AddContractor = () => {
  const { data: contractors } = useGetContractorsQuery();
  const { handleUpdateEntity } = useAddAdminEntities();
  return (
    <section className={styles.inner}>
      <div className={styles.form}>
        <MultiForm />
      </div>
      <aside className={styles.list}>
        <ItemsList
          items={contractors || []}
          handle={(id, field) => handleUpdateEntity(id, field)}
          field="contractor"
        />
      </aside>
    </section>
  );
};

export default AddContractor;
