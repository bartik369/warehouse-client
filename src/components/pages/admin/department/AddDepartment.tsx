import ItemsList from '../ItemsList';
import MultiForm from '../../../forms/multi/MultiForm';
import { useAddAdminEntities } from '../../../../hooks/data/useAddAdminEntities';
import { useGetDepartmentsQuery } from '../../../../store/api/departmentApi';
import { addDepartmentTitle } from '../../../../utils/constants/constants';
import { departmentFormFields } from '../../../forms/multi/formConfigs/modelFormFields';
import styles from '../Admin.module.scss';

const AddDepartment = () => {
  const { actions, state } = useAddAdminEntities();
  const { data: departments } = useGetDepartmentsQuery();
  return (
    <section className={styles.inner}>
      <div className={styles.form}>
        <MultiForm
          fields={departmentFormFields}
          title={addDepartmentTitle}
          state={state}
          actions={actions}
          locationType="department"
        />
      </div>
      <aside className={styles.list}>
        <ItemsList
          actions={actions}
          items={departments || []}
          field="department"
        />
      </aside>
    </section>
  );
};

export default AddDepartment;
