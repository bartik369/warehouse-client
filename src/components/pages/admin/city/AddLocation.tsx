import ItemsList from '../ItemsList';
import MultiForm from '../../../forms/multi/MultiForm';
import { useGetLocationsQuery } from '../../../../store/api/locationApi';
import { useAddAdminEntities } from '../../../../hooks/data/useAddAdminEntities';
import styles from '../Admin.module.scss';

const AddLocation = () => {
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
  const { data: cities } = useGetLocationsQuery();
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
          field="location"
          items={cities || []}
          handle={(id, field) => handleGetEntity(id, field)}
        />
      </aside>
    </section>
  );
};

export default AddLocation;
