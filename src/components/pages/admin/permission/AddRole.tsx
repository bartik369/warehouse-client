import ItemsList from '../ItemsList';
import MultiForm from '../../../forms/multi/MultiForm';
import { useGetRolesQuery } from '../../../../store/api/permissionApi';
import { useAddAdminEntities } from '../../../../hooks/data/useAddAdminEntities';
import styles from '../Admin.module.scss';

const AddRole = () => {
  const {data: roles} = useGetRolesQuery();
    const {
        entity,
        errors,
        isUpdate,
        handleInputChange,
        handleCreateEntity,
        handleResetEntity,
        handleGetEntity,
        handleDeleteEntity,
      } = useAddAdminEntities();
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
              field="role"
              items={roles || []}
              onEdit={handleGetEntity}
              onDelete={handleDeleteEntity}
            />
          </aside>
        </section>
      );
};

export default AddRole;