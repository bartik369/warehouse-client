import Toggle from '@/components/ui/checkbox/Toggle';
import Input from '@/components/ui/input/Input';
import CustomNumber from '@/components/ui/number/CustomNumber';
import Number from '@/components/ui/number/Number';
import Select from '@/components/ui/select/Select';
import { Device } from '@/entities/device/model/types';
import { useGlobalModal } from '@/hooks/data/useGlobalModal';
import { ModalType } from '@/reducers/modal/modalTypes';
import { DeviceFormActions, Entity } from '@/types/devices';
import { deviceTypes } from '@/utils/constants/device';
import { LABELS } from '@/utils/constants/ui/labels';
import { SECTION_TITLES } from '@/utils/constants/ui/titles';

import Ask from './Ask';
import styles from './DeviceForm.module.scss';

interface DeviceTechnicalSectionProps {
  state: Device;
  actions: DeviceFormActions;
  errors: Record<string, string>;
  checked: boolean;
  manufacturers: Entity[];
  warehouses: Entity[];
  types: Entity[];
  models: Entity[];
}

const DeviceTechnicalSection = ({
  state,
  actions,
  errors,
  checked,
  manufacturers,
  warehouses,
  types,
  models,
}: DeviceTechnicalSectionProps) => {
  const { openModal } = useGlobalModal();
  const openEntityModal = (type: ModalType, title: string) => {
    openModal(type, {
      title,
      maxWidth: 360,
      state: {},
    });
  };

  return (
    <>
      <div className={styles.title}>{SECTION_TITLES.technicalOptions}</div>
      <form className={styles.form}>
        <Input
          onChange={(e) => actions.handleInputChange('name', e.target.value)}
          type="text"
          value={state.name}
          label={LABELS.deviceName}
          errors={errors}
          name="name"
        />
        <div className={styles.container}>
          <Ask onAsk={() => openEntityModal('type', SECTION_TITLES.addType)} />
          <Select<Entity>
            setValue={actions.handleTypeChange}
            items={types || []}
            label={LABELS.deviceType}
            value={state.model?.type?.name || ''}
            errors={errors}
            name="typeName"
            getId={(item: Entity) => item.id}
            getLabel={(item) => item.name}
          />
        </div>
        <div className={styles.container}>
          <Ask onAsk={() => openEntityModal('manufacturer', SECTION_TITLES.addManufacturer)} />
          <Select<Entity>
            setValue={actions.handleManufacturerChange}
            items={manufacturers || []}
            label={LABELS.manufacturer}
            value={state.model?.manufacturer.name || ''}
            errors={errors}
            name="manufacturerName"
            getId={(item: Entity) => item.id}
            getLabel={(item) => item.name}
          />
        </div>
        {state.model?.type.slug && state.model.manufacturer.slug && (
          <div className={styles.container}>
            <Ask onAsk={() => openEntityModal('model', SECTION_TITLES.addModel)} />
            <Select<Entity>
              setValue={actions.handleModelChange}
              items={models || []}
              label={LABELS.model}
              value={state.model.name || ''}
              errors={errors}
              name="modelName"
              getId={(item: Entity) => item.id}
              getLabel={(item) => item.name}
            />
          </div>
        )}
        <Input
          onChange={(e) => actions.handleInputChange('serialNumber', e.target.value)}
          type={'text'}
          value={state.serialNumber || ''}
          label={LABELS.serialNumber}
          errors={errors}
          name="serialNumber"
        />
        <Input
          onChange={(e) => actions.handleInputChange('inventoryNumber', e.target.value)}
          type={'text'}
          value={state.inventoryNumber || ''}
          label={LABELS.inventoryNumber}
          errors={errors}
          name="inventoryNumber"
        />
        <Input
          onChange={(e) => actions.handleInputChange('modelCode', e.target.value)}
          type={'text'}
          value={state.modelCode || ''}
          label={LABELS.modelCode}
          errors={errors}
          name="modelCode"
        />
        <Select<Entity>
          setValue={actions.handleWarehouseChange}
          items={warehouses || []}
          label={LABELS.location}
          value={state.warehouse?.name || ''}
          errors={errors}
          name="warehouseId"
          getId={(item: Entity) => item.id}
          getLabel={(item) => item.name}
        />
        <Number device={state} setDevice={actions.handleNumber} />
        {state.model?.type.slug &&
          deviceTypes[state.model?.type.slug]?.uniqueFields?.map((item) => (
            <CustomNumber
              key={item.name}
              device={state}
              setDevice={actions.handleExtNumber}
              item={item}
              errors={errors}
            />
          ))}
        <Toggle
          checked={checked}
          setChecked={actions.handleChecked}
          label={LABELS.serviceable}
          leftPosition={LABELS.no}
          rightPosition={LABELS.yes}
        />
      </form>
    </>
  );
};

export default DeviceTechnicalSection;
