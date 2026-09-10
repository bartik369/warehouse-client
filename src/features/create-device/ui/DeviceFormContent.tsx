import { PAGE_TITLES } from '@/shared/config/page-titles';
import { ActionButtons } from '@/shared/ui/action-buttons/ActionButtons';
import { PageHeader } from '@/shared/ui/page-header/PageHeader';

import { CREATE_DEVICE_DESCRIPTION } from '../model/constants';
import { useCreateDeviceForm } from '../model/useDeviceForm';
import { DeviceAdditionalSection } from './DeviceAdditionalSection';
import { DeviceFinancialSection } from './DeviceFinancialSection';
import styles from './DeviceFrom.module.scss';
import { DeviceInfoSection } from './DeviceInfoSection';
import { DeviceModelSection } from './DeviceModelSection';
import { DevicePreview } from './DevicePreview';
import { DeviceStatusAndLocationSection } from './DeviceStatusAndLocationSection';
import { DeviceWarrantySection } from './DeviceWarrantySection';

export const DeviceFormContent = () => {
  const {
    manufacturerId,
    typeId,
    selectedModel,
    selectedType,
    manufacturersOptions,
    typesOptions,
    modelsOptions,
    warehousesOptions,
    functionalOptions,
    contractorsOptions,
    isLoadingModels,
    isCreating,
    handleSubmitForm,
    handleReset,
  } = useCreateDeviceForm();

  return (
    <>
      <PageHeader
        title={PAGE_TITLES.addDevice}
        description={CREATE_DEVICE_DESCRIPTION}
        actions={
          <ActionButtons
            titleApply="Сохранить устройство"
            titleReset="Отмена"
            size="middle"
            onApply={handleSubmitForm}
            onReset={handleReset}
            loading={isCreating}
          />
        }
      />
      <div className={styles.layout}>
        <div className={styles.content}>
          <DeviceModelSection
            availableModel={Boolean(manufacturerId && typeId)}
            manufacturersOptions={manufacturersOptions}
            typesOptions={typesOptions}
            modelsOptions={modelsOptions}
            isLoadingModels={isLoadingModels}
          />
          <DeviceInfoSection selectedType={selectedType} />
          <DeviceStatusAndLocationSection
            warehousesOptions={warehousesOptions}
            functionalOptions={functionalOptions}
          />
          <DeviceFinancialSection />
          <DeviceWarrantySection options={contractorsOptions} />
          <DeviceAdditionalSection />
        </div>

        <aside className={styles.sidebar}>
          <div className={styles.sticky}>
            <DevicePreview model={selectedModel} />
          </div>
        </aside>
      </div>
    </>
  );
};
