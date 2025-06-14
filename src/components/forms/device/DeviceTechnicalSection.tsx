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
import { IEntity, IDeviceFormActions } from "../../../types/devices";
import { IDeviceState } from "../../../reducers/device/deviceTypes";
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

interface IDeviceTechnicalSectionProps {
  state: IDeviceState;
  actions: IDeviceFormActions;
  manufacturers: IEntity[];
  warehouses: IEntity[];
  types: IEntity[];
  models: IEntity[];
}

const DeviceTechnicalSection = ({
  state,
  actions,
  manufacturers,
  warehouses,
  types,
  models,
}: IDeviceTechnicalSectionProps) => {
  const { openModal } = useGlobalModal();

  const openEntityModal = (type: ModalType, title: string) => {
    openModal(type, {
      title,
      maxWidth: 360,
      state: {},
      actions,
    });
  };

  return (
    <>
      <div className={styles.title}>{technicalOptions}</div>
      <form className={styles.form}>
        <Input
          onChange={(e) => actions.handleInputChange("name", e.target.value)}
          type="text"
          value={state.device.name}
          label={deviceName}
          errors={state.errors}
          name="name"
        />
        <div className={styles.container}>
          <Ask
            onAsk={() => openEntityModal('type', addNewType)}
          />
          <Select<IEntity>
            setValue={actions.handleTypeChange}
            items={types || []}
            label={deviceTypeLabel}
            value={state.device.typeName || ""}
            errors={state.errors}
            name="typeName"
            getId={(item: IEntity) => item.id}
            getLabel={(item) => item.name}
          />
        </div>
        <div className={styles.container}>
          <Ask
           onAsk={() => openEntityModal('manufacturer', addNewManufacturer)}
          />
          <Select<IEntity>
            setValue={actions.handleManufacturerChange}
            items={manufacturers || []}
            label={manufacturersLabel}
            value={state.device.manufacturerName || ""}
            errors={state.errors}
            name="manufacturerName"
            getId={(item: IEntity) => item.id}
            getLabel={(item) => item.name}
          />
        </div>
        {state.device.typeSlug && state.device.manufacturerSlug && (
          <div className={styles.container}>
            <Ask
              onAsk={() => openEntityModal('model', addNewModel)}
            />
            <Select<IEntity>
              setValue={actions.handleModelChange}
              items={models || []}
              label={modelLabel}
              value={state.device.modelName || ""}
              errors={state.errors}
              name="modelName"
              getId={(item: IEntity) => item.id}
              getLabel={(item) => item.name}
            />
          </div>
        )}
        <Input
          onChange={(e) =>
            actions.handleInputChange("serialNumber", e.target.value)
          }
          type={"text"}
          value={state.device.serialNumber || ""}
          label={serialNumber}
          errors={state.errors}
          name="serialNumber"
        />
        <Input
          onChange={(e) =>
            actions.handleInputChange("inventoryNumber", e.target.value)
          }
          type={"text"}
          value={state.device.inventoryNumber || ""}
          label={inventoryNumber}
          errors={state.errors}
          name="inventoryNumber"
        />
        <Input
          onChange={(e) =>
            actions.handleInputChange("modelCode", e.target.value)
          }
          type={"text"}
          value={state.device.modelCode || ""}
          label={modelCode}
          errors={state.errors}
          name="modelCode"
        />
        <Select<IEntity>
          setValue={actions.handleWarehouseChange}
          items={warehouses || []}
          label={location}
          value={state.device.warehouseName || ""}
          errors={state.errors}
          name="warehouseId"
          getId={(item: IEntity) => item.id}
          getLabel={(item) => item.name}
        />
        <Number device={state.device} setDevice={actions.handleNumber} />
        {state.device.typeSlug &&
          deviceTypes[state.device.typeSlug]?.uniqueFields?.map((item) => (
            <CustomNumber
              key={item.name}
              device={state.device}
              setDevice={actions.handleExtNumber}
              item={item}
              errors={state.errors}
            />
          ))}
        <Toggle
          checked={state.checked}
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
