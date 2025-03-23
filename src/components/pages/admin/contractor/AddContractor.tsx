import ItemsList from '../ItemsList';
import { useAddAdminEntities } from '../../../../hooks/data/useAddAdminEntities';
import { useGetContractorsQuery } from '../../../../store/api/contractorApi';
import MultiForm from '../../../forms/multi/MultiForm';
import styles from '../Admin.module.scss';

const AddContractor = () => {
  const { data: contractors } = useGetContractorsQuery();
  const {
    entity,
    errors,
    isUpdate,
    handleCityChange,
    handleInputChange,
    handleCreateEntity,
    handleResetEntity,
    handleGetEntity,
  } = useAddAdminEntities();
  return (
    <section className={styles.inner}>
      <div className={styles.form}>
        <MultiForm
          isUpdate={isUpdate}
          entity={entity}
          errors={errors}
          handleCity={handleCityChange}
          handleInput={(name, e) => handleInputChange(name, e)}
          handleCreate={(e, type) => handleCreateEntity(e, type)}
          handleReset={handleResetEntity}
        />
      </div>
      <aside className={styles.list}>
        <ItemsList
          items={contractors || []}
          handle={(id, field) => handleGetEntity(id, field)}
          field="contractor"
        />
      </aside>
    </section>
  );
};

export default AddContractor;
