import ItemsList from '../ItemsList';
import MultiForm from '@/components/forms/multi/MultiForm';
import { useAddAdminEntities } from '@/hooks/data/useAddAdminEntities';
import { useGetAllModelsQuery } from '@/store/api/modelsApi';
import { modelFormFields } from '@/components/forms/multi/formConfigs/modelFormFields';
import { SECTION_TITLES } from '@/utils/constants/ui/titles';
import styles from '../Admin.module.scss';

const AddModel = () => {
    const { actions, state, fileInputRef} = useAddAdminEntities();
      const { data: models } = useGetAllModelsQuery();
      return (
        <section className={styles.inner}>
          <div className={styles.form}>
            <MultiForm
              fields={modelFormFields}
              title={SECTION_TITLES.addModel}
              fieldType="model"
              fileInputRef={fileInputRef}
              actions={actions}
              state={state}
              locationType="model"
            />
          </div>
          <aside className={styles.list}>
            <ItemsList
              field="model"
              items={models || []}
              actions={actions}
            />
          </aside>
        </section>
      );
};

export default AddModel;