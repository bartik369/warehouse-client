import { Flex } from 'antd';

import { PageHeader } from '@/shared/ui/page-header/PageHeader';
import { useModelTableController } from '@/widgets/devices-models-table/model/useModelTableController';

import { DeviceModelsTable } from '../../../widgets/devices-models-table/ui/DeviceModelsTable';
import { useManageModel } from '../model/useManageModel';
import styles from './ManageModel.module.scss';
import { ModelFilters } from './model-filters/ModelFilters';
import { ModelForm } from './model-form/ModelForm';

export const ManageModel = () => {
  const {
    filters,
    previewUrl,
    mode,
    editingModel,
    manufacturersOptions,
    typesOptions,
    onSave,
    onPreview,
    onReset,
    onEdit,
    onDelete,
    onResetFilter,
    resetId,
    onSearch,
    handleTypeChange,
    handleManufacturerChange,
  } = useManageModel();
  const { page, limit, models, totalCount, isLoading, isFetching, setPage, setLimit } =
    useModelTableController(filters);
  return (
    <Flex vertical>
      <PageHeader
        title="Модели устройств"
        description="Упаравление моделями устройств. Добавление и редактирование."
      />
      <Flex vertical gap={30}>
        <Flex gap={20}>
          <div className={styles.form}>
            <ModelForm
              previewUrl={previewUrl}
              data={editingModel}
              mode={mode}
              resetId={resetId}
              onSave={onSave}
              onPreview={onPreview}
              onReset={onReset}
            />
          </div>
        </Flex>
        <ModelFilters
          filters={filters}
          manufacturersOptions={manufacturersOptions}
          typesOptions={typesOptions}
          handleManufacturerChange={handleManufacturerChange}
          handleTypeChange={handleTypeChange}
          onResetFilter={onResetFilter}
          onSearch={onSearch}
        />
        <DeviceModelsTable
          page={page}
          totalCount={totalCount}
          limit={limit}
          data={models}
          loading={isLoading}
          onEdit={onEdit}
          onDelete={onDelete}
          setPage={setPage}
          setLimit={setLimit}
        />
      </Flex>
    </Flex>
  );
};
