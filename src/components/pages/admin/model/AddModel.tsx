import ItemsList from '../ItemsList';
import MultiForm from '../../../forms/multi/MultiForm';
import { useAddAdminEntities } from '../../../../hooks/data/useAddAdminEntities';
import { useGetAllModelsQuery } from '../../../../store/api/modelsApi';
import { addModelTitle } from '../../../../utils/constants/constants';
import styles from '../Admin.module.scss';
import { modelFormFields } from '../../../forms/multi/formConfigs/modelFormFields';

const AddModel = () => {
    const { media, fileInputRef, actions, state } = useAddAdminEntities();
      const { data: models } = useGetAllModelsQuery();
      return (
        <section className={styles.inner}>
          <div className={styles.form}>
            <MultiForm
              fields={modelFormFields}
              title={addModelTitle}
              media={media}
              fieldType='model'
              fileInputRef={fileInputRef}
              actions={actions}
              state={state}
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