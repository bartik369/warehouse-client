import { Flex } from 'antd';

import { PageHeader } from '@/shared/ui/page-header/PageHeader';

import { useManageModel } from '../model/useManageModel';
import styles from './ManageModel.module.scss';
import { ModelForm } from './model-form/ModelForm';
import { ModelFilter } from './models-filter/ModelFilter';
import { DeviceModelsTable } from './models-table/DeviceModelsTable';

export const ManageModel = () => {
  const {
    previewUrl,
    models,
    mode,
    editingModel,
    page,
    manufacturersOptions,
    typesOptions,
    modelsLoading,
    onSave,
    onPreview,
    onReset,
    onEdit,
    onDelete,
    onResetFilter,
    resetId,
  } = useManageModel();
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
        <ModelFilter
          manufacturersOptions={manufacturersOptions}
          typesOptions={typesOptions}
          onResetFilter={onResetFilter}
        />
        <DeviceModelsTable
          page={page}
          limit={10}
          data={models}
          loading={modelsLoading}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </Flex>
    </Flex>
  );
};
