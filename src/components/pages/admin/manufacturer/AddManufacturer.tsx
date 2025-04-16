import ItemsList from '../ItemsList';
import MultiForm from '../../../forms/multi/MultiForm';
import { useAddAdminEntities } from '../../../../hooks/data/useAddAdminEntities';
import { useGetManufacturersQuery } from '../../../../store/api/manufacturersApi';
import styles from '../Admin.module.scss';

const AddManufacturer = () => {
  const {
    entity,
    errors,
    isUpdate,
    handleInputChange,
    handleCreateEntity,
    handleResetEntity,
    handleGetEntity,
  } = useAddAdminEntities();
  const { data: manufacturers } = useGetManufacturersQuery();
  return (
    <section className={styles.inner}>
      <div className={styles.form}>
        <MultiForm
          isUpdate={isUpdate}
          entity={entity}
          errors={errors}
          handleInput={handleInputChange}
          handleCreate={handleCreateEntity}
          handleReset={handleResetEntity}
        />
      </div>
      <aside className={styles.list}>
        <ItemsList
          field="manufacturer"
          items={manufacturers || []}
          onEdit={handleGetEntity}
        />
      </aside>
    </section>
  );
};

export default AddManufacturer;
