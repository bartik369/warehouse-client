import ItemsList from '../ItemsList';
import { useAddAdminEntities } from '../../../../hooks/data/useAddAdminEntities';
import { useGetContractorsQuery } from '../../../../store/api/contractorApi';
import MultiForm from '../../../forms/multi/MultiForm';
import { addContractorTitle } from '../../../../utils/constants/constants';
import styles from '../Admin.module.scss';

const AddContractor = () => {
  const { data: contractors } = useGetContractorsQuery();
  const {
    entity,
    errors,
    isUpdate,
    handleInputChange,
    handleCreateEntity,
    handleResetEntity,
    handleGetEntity,
  } = useAddAdminEntities();
  return (
    <section className={styles.inner}>
      <div className={styles.form}>
        <MultiForm
          title={addContractorTitle}
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
          items={contractors || []}
          onEdit={handleGetEntity}
          field="contractor"
        />
      </aside>
    </section>
  );
};

export default AddContractor;
