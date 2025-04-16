import ItemsList from '../ItemsList';
import { useGetWarehousesQuery } from '../../../../store/api/warehousesApi';
import MultiForm from '../../../forms/multi/MultiForm';
import { useAddAdminEntities } from '../../../../hooks/data/useAddAdminEntities';
import styles from '../Admin.module.scss';

const AddWarehouse = () => {
  const { data: warehouses } = useGetWarehousesQuery();
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
          handleInput={handleInputChange}
          handleCreate={handleCreateEntity}
          handleReset={handleResetEntity}
        />
      </div>
      <aside className={styles.list}>
        <ItemsList
          field="warehouse"
          items={warehouses || []}
          onEdit={handleGetEntity}
        />
      </aside>
    </section>
  );
};

export default AddWarehouse;
