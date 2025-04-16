import ItemsList from '../ItemsList';
import MultiForm from '../../../forms/multi/MultiForm';
import { useAddAdminEntities } from '../../../../hooks/data/useAddAdminEntities';
import { useGetDepartmentsQuery } from '../../../../store/api/departmentApi';
import styles from '../Admin.module.scss';

const AddDepartment = () => {
  const {
    entity,
    errors,
    isUpdate,
    handleInputChange,
    handleCreateEntity,
    handleResetEntity,
    handleGetEntity,
  } = useAddAdminEntities();
  const { data: departments } = useGetDepartmentsQuery();
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
          items={departments || []}
          field="department"
          onEdit={handleGetEntity}
        />
      </aside>
    </section>
  );
};

export default AddDepartment;
