import {
  yes,
  no,
  serviceable,
  technicalOptions,
  addNewType,
  addNewModel,
  addNewManufacturer,
} from "../../../utils/constants/constants";
import Input from "../../ui/input/Input";
import Ask from "./Ask";
import Select from "../../ui/select/Select";
import { Entity, DeviceFormActions, Device } from "../../../types/devices";
import {
  deviceName,
  deviceTypeLabel,
  deviceTypes,
  inventoryNumber,
  manufacturersLabel,
  modelCode,
  modelLabel,
  serialNumber,
  location,
} from "../../../utils/constants/device";
import CustomNumber from "../../ui/number/CustomNumber";
import Number from "../../ui/number/Number";
import Toggle from "../../ui/checkbox/Toggle";
import styles from "./DeviceForm.module.scss";
import { useGlobalModal } from "../../../hooks/data/useGlobalModal";
import { ModalType } from "../../../reducers/modal/modalTypes";

interface DeviceTechnicalSectionProps {
  state: Device;
  actions: DeviceFormActions;
  errors: Record<string, string>
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
      <div className={styles.title}>{technicalOptions}</div>
      <form className={styles.form}>
        <Input
          onChange={(e) => actions.handleInputChange("name", e.target.value)}
          type="text"
          value={state.name}
          label={deviceName}
          errors={errors}
          name="name"
        />
        <div className={styles.container}>
          <Ask
            onAsk={() => openEntityModal('type', addNewType)}
          />
          <Select<Entity>
            setValue={actions.handleTypeChange}
            items={types || []}
            label={deviceTypeLabel}
            value={state.typeName || ""}
            errors={errors}
            name="typeName"
            getId={(item: Entity) => item.id}
            getLabel={(item) => item.name}
          />
        </div>
        <div className={styles.container}>
          <Ask
           onAsk={() => openEntityModal('manufacturer', addNewManufacturer)}
          />
          <Select<Entity>
            setValue={actions.handleManufacturerChange}
            items={manufacturers || []}
            label={manufacturersLabel}
            value={state.manufacturerName || ""}
            errors={errors}
            name="manufacturerName"
            getId={(item: Entity) => item.id}
            getLabel={(item) => item.name}
          />
        </div>
        {state.typeSlug && state.manufacturerSlug && (
          <div className={styles.container}>
            <Ask
              onAsk={() => openEntityModal('model', addNewModel)}
            />
            <Select<Entity>
              setValue={actions.handleModelChange}
              items={models || []}
              label={modelLabel}
              value={state.modelName || ""}
              errors={errors}
              name="modelName"
              getId={(item: Entity) => item.id}
              getLabel={(item) => item.name}
            />
          </div>
        )}
        <Input
          onChange={(e) =>
            actions.handleInputChange("serialNumber", e.target.value)
          }
          type={"text"}
          value={state.serialNumber || ""}
          label={serialNumber}
          errors={errors}
          name="serialNumber"
        />
        <Input
          onChange={(e) =>
            actions.handleInputChange("inventoryNumber", e.target.value)
          }
          type={"text"}
          value={state.inventoryNumber || ""}
          label={inventoryNumber}
          errors={errors}
          name="inventoryNumber"
        />
        <Input
          onChange={(e) =>
            actions.handleInputChange("modelCode", e.target.value)
          }
          type={"text"}
          value={state.modelCode || ""}
          label={modelCode}
          errors={errors}
          name="modelCode"
        />
        <Select<Entity>
          setValue={actions.handleWarehouseChange}
          items={warehouses || []}
          label={location}
          value={state.warehouseName || ""}
          errors={errors}
          name="warehouseId"
          getId={(item: Entity) => item.id}
          getLabel={(item) => item.name}
        />
        <Number device={state} setDevice={actions.handleNumber} />
        {state.typeSlug &&
          deviceTypes[state.typeSlug]?.uniqueFields?.map((item) => (
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
          label={serviceable}
          leftPosition={no}
          rightPosition={yes}
        />
      </form>
    </>
  );
};

export default DeviceTechnicalSection;
