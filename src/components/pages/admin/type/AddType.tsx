import ItemsList from '../ItemsList';
import MultiForm from '../../../forms/multi/MultiForm';
import { useGetTypesQuery } from '../../../../store/api/typesApi';
import { useAddAdminEntities } from '../../../../hooks/data/useAddAdminEntities';
import styles from '../Admin.module.scss';

const AddType = () => {
    const {
        entity,
        errors,
        isUpdate,
        handleInputChange,
        handleCreateEntity,
        handleResetEntity,
        handleGetEntity,
      } = useAddAdminEntities();
      const { data: types } = useGetTypesQuery();
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
              field="type"
              items={types || []}
              onEdit={handleGetEntity}
            />
          </aside>
        </section>
      );
};

export default AddType;