import ItemsList from '../ItemsList';
import { useAddAdminEntities } from '../../../../hooks/data/useAddAdminEntities';
import { useGetContractorsQuery } from '../../../../store/api/contractorApi';
import MultiForm from '../../../forms/multi/MultiForm';
import { contractorFormFields } from '../../../forms/multi/formConfigs/modelFormFields';
import { SECTION_TITLES } from '../../../../utils/constants/ui/titles';
import styles from '../Admin.module.scss';

const AddContractor = () => {
  const { data: contractors } = useGetContractorsQuery();
  const { state, actions } = useAddAdminEntities();
  return (
    <section className={styles.inner}>
      <div className={styles.form}>
        <MultiForm
          fields={contractorFormFields}
          title={SECTION_TITLES.addContractor}
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
