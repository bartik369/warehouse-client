import MultiForm from '@/components/forms/multi/MultiForm';
import { useAddAdminEntities } from '@/hooks/data/useAddAdminEntities';
import { useGetLocationsQuery } from '@/store/api/locationApi';
import { SECTION_TITLES } from '@/utils/constants/ui/titles';

import { locationFormFields } from '../../../components/forms/multi/formConfigs/modelFormFields';
import styles from '../Admin.module.scss';
import ItemsList from '../ItemsList';

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
        <ItemsList actions={actions} field="location" items={cities || []} />
      </aside>
    </section>
  );
};

export default AddLocation;
