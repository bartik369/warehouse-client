import ItemsList from '../ItemsList';
import MultiForm from '../../../forms/multi/MultiForm';
import { useGetLocationsQuery } from '../../../../store/api/locationApi';
import { useAddAdminEntities } from '../../../../hooks/data/useAddAdminEntities';
import { addLocationTitle } from '../../../../utils/constants/constants';
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
          title={addLocationTitle}
          entity={entity}
          errors={errors}
          handleCity={handleCityChange}
          handleInput={handleInputChange}
          handleCreate={handleCreateEntity}
          handleReset={handleResetEntity}
        />
      </div>
      <aside className={styles.list}>
        <ItemsList
          field="location"
          items={cities || []}
          onEdit={handleGetEntity}
        />
      </aside>
    </section>
  );
};

export default AddLocation;
