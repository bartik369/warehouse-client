import ItemsList from '../ItemsList';
import { useAddAdminEntities } from '../../../../hooks/data/useAddAdminEntities';
import { useGetContractorsQuery } from '../../../../store/api/contractorApi';
import MultiForm from '../../../forms/multi/MultiForm';
import { addContractorTitle } from '../../../../utils/constants/constants';
import { contractorFormFields } from '../../../forms/multi/formConfigs/modelFormFields';
import styles from '../Admin.module.scss';

const AddContractor = () => {
  const { data: contractors } = useGetContractorsQuery();
  const { state, actions } = useAddAdminEntities();
  return (
    <section className={styles.inner}>
      <div className={styles.form}>
        <MultiForm
          fields={contractorFormFields}
          title={addContractorTitle}
          actions={actions}
          state={state}
          locationType="contractor"
        />
      </div>
      <aside className={styles.list}>
        <ItemsList
          items={contractors || []}
          actions={actions}
          field="contractor"
        />
      </aside>
    </section>
  );
};

export default AddContractor;
