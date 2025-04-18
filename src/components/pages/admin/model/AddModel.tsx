import ItemsList from '../ItemsList';
import MultiForm from '../../../forms/multi/MultiForm';
import { useAddAdminEntities } from '../../../../hooks/data/useAddAdminEntities';
import { useGetAllModelsQuery } from '../../../../store/api/modelsApi';
import styles from '../Admin.module.scss';

const AddModel = () => {
    const {
        entity,
        errors,
        isUpdate,
        media,
        fileInputRef,
        handleMedia,
        handleInputChange,
        handleCreateEntity,
        handleResetEntity,
        handleGetEntity,
        handleCityChange,
        handleManufacturerChange,
        handleTypeChange,
      } = useAddAdminEntities();
      const { data: models } = useGetAllModelsQuery();
      return (
        <section className={styles.inner}>
          <div className={styles.form}>
            <MultiForm
              media={media}
              isUpdate={isUpdate}
              entity={entity}
              fieldType='model'
              errors={errors}
              fileInputRef={fileInputRef}
              setMedia={handleMedia}
              handleCity={handleCityChange}
              handleManufacturer={handleManufacturerChange}
              handleType={handleTypeChange}
              handleInput={handleInputChange}
              handleCreate={handleCreateEntity}
              handleReset={handleResetEntity}
            />
          </div>
          <aside className={styles.list}>
            <ItemsList
              field="model"
              items={models || []}
              onEdit={handleGetEntity}
            />
          </aside>
        </section>
      );
};

export default AddModel;