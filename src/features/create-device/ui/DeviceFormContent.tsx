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
    manufacturersOptions,
    typesOptions,
    modelsOptions,
    warehousesOptions,
    functionalOptions,
    contractorsOptions,
    isLoadingModels,
  } = useCreateDeviceForm();
  return (
    <div className={styles.layout}>
      <div className={styles.content}>
        <DeviceModelSection
          showModelSelect={Boolean(manufacturerId && typeId)}
          manufacturersOptions={manufacturersOptions}
          typesOptions={typesOptions}
          modelsOptions={modelsOptions}
          isLoadingModels={isLoadingModels}
        />
        <DeviceInfoSection />
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
  );
};
