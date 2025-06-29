import ItemsList from '../ItemsList';
import MultiForm from '@/components/forms/multi/MultiForm';
import { useGetLocationsQuery } from '@/store/api/locationApi';
import { useAddAdminEntities } from '@/hooks/data/useAddAdminEntities';
import { locationFormFields } from '../../../forms/multi/formConfigs/modelFormFields';
import { SECTION_TITLES } from '@/utils/constants/ui/titles';
import styles from '../Admin.module.scss';

const AddLocation = () => {
  const { actions, state } = useAddAdminEntities();
  const { data: cities } = useGetLocationsQuery();
  return (
    <section className={styles.inner}>
      <div className={styles.form}>
        <MultiForm
          actions={actions}
          state={state}
          fields={locationFormFields}
          title={SECTION_TITLES.addLocation}
          locationType="location"
        />
      </div>
      <aside className={styles.list}>
        <ItemsList
          actions={actions}
          field="location"
          items={cities || []}
        />
      </aside>
    </section>
  );
};

export default AddLocation;
