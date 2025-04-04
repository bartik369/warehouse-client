import { FC, useEffect} from "react";
import Input from "../../ui/input/Input";
import Select from "../../ui/select/Select";
import Textarea from "../../ui/textarea/Textarea";
import Toggle from "../../ui/checkbox/Toggle";
import Number from "../../ui/number/Number";
import CustomNumber from "../../ui/number/CustomNumber";
import Actions from "./Actions";
import DevicePreview from "./DevicePreview";
import PriceForm from "./PriceForm";
import WarrantyForm from "./WarrantyForm";
import { useAppDispatch } from "../../../hooks/redux/useRedux";
import { setDevicePic } from "../../../store/slices/deviceSlice";
import { useModal } from "../../../hooks/data/useModal";
import { useGetWarehousesQuery } from "../../../store/api/warehousesApi";
import { useLazyGetModelsQuery } from "../../../store/api/modelsApi";
import { useGetTypesQuery } from "../../../store/api/typesApi";
import { useGetManufacturersQuery } from "../../../store/api/manufacturersApi";
import { IEntity, IUpdateDeviceFormActions, IUpdateDeviceFormSetters, IUpdateDeviceFormState } from "../../../types/devices";
import { IAdminEntity, IContractor } from "../../../types/content";
import { Bounce, ToastContainer } from "react-toastify";
import { yes, no, serviceable, technicalOptions, financialOptions,
  warrantyOptions } from "../../../utils/constants/constants";
import { manufacturersLabel, deviceTypeLabel, deviceName, serialNumber, inventoryNumber,
  description, modelCode, modelLabel, location, deviceTypes
} from "../../../utils/constants/device";
import styles from "./DeviceForm.module.scss";

interface IUpdateDeviceFormProps {
  state: IUpdateDeviceFormState
  actions: IUpdateDeviceFormActions;
  setters: IUpdateDeviceFormSetters;
}
const UpdateDeviceForm: FC<IUpdateDeviceFormProps> = ({ state, actions, setters }) => {
  const { isOpen, entity, setIsOpen, setEntity } = useModal(false);
  const { data: manufacturers } = useGetManufacturersQuery();
  const { data: warehouses } = useGetWarehousesQuery();
  const { data: types } = useGetTypesQuery();
  const [ getModels, { data: models } ] = useLazyGetModelsQuery();
  const dispatch = useAppDispatch();
  
  // Allow model query by manufacturer and type
  useEffect(() => {
    if (state.device.modelName && models) {
      models.forEach((model: IAdminEntity) => {
        if (model.name === state.device.modelName) {
          dispatch(setDevicePic(model.imagePath || ''))
        }
      });
    }
  }, [state.device.modelName, models, dispatch]);

  // Resetting the model and preview of the device when changing the manufacturer and type
  useEffect(() => {
    if (state.device.manufacturer && state.device.type) {
      getModels({ manufacturer: state.device.manufacturer, type: state.device.type })
      // resetModel();
    }
  }, [state.device.manufacturer, state.device.type]);

  return (
    <>
    <ToastContainer position="top-center" theme="light" transition={Bounce} />
      <article className={styles.wrapper}>
        <DevicePreview />
        <div className={styles.forms}>
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
              <Select<IEntity>
                setValue={actions.handleTypeChange}
                items={types || []}
                label={deviceTypeLabel}
                value={state.selectedValues["type"]}
                errors={state.errors}
                name="type"
                getId={(item:IEntity) => item.id}
              />
            </div>
            <div className={styles.container}>
              <Select<IEntity>
                setValue={actions.handleManufacturerChange}
                items={manufacturers || []}
                label={manufacturersLabel}
                value={state.selectedValues["manufacturer"]}
                errors={state.errors}
                name="manufacturer"
                getId={(item:IEntity) => item.id}
              />
            </div>
            {(state.selectedValues['manufacturer'] && state.selectedValues['type']) && (
              <div className={styles.container}>
                <Select<IEntity>
                  setValue={actions.handleModelChange}
                  items={models || []}
                  label={modelLabel}
                  value={state.selectedValues["modelName"]}
                  errors={state.errors}
                  name="modelName"
                  getId={(item:IEntity) => item.id}
                />
              </div>
            )}
            <Input
              onChange={(e) => actions.handleInputChange("serialNumber", e.target.value)}
              type={"text"}
              value={state.device.serialNumber || ""}
              label={serialNumber}
              errors={state.errors}
              name="serialNumber"
            />
            <Input
              onChange={(e) => actions.handleInputChange("inventoryNumber", e.target.value)}
              type={"text"}
              value={state.device.inventoryNumber || ""}
              label={inventoryNumber}
              errors={state.errors}
              name="inventoryNumber"
            />
            <Input
              onChange={(e) => actions.handleInputChange("modelCode", e.target.value)}
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
              value={state.selectedValues["warehouseName"]}
              errors={state.errors}
              name="warehouseId"
              getId={(item:IEntity) => item.id}
            />
            <Number device={state.device} setDevice={actions.handleNumber} />
            {state.itemType && deviceTypes[state.itemType]?.uniqueFields?.map((item) => (
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
          <div className={styles.title}>{financialOptions}</div>
          <PriceForm  device={state.device} errors={state.errors} handleExtNumber={actions.handleExtNumber} />
          <div className={styles.title}>{warrantyOptions}</div>
          <WarrantyForm
            getId={(item:IContractor) => item.id}
            device={state.device}
            entity={entity} 
            isOpen={isOpen}
            setIsOpen={setIsOpen} 
            setEntity={setEntity} 
            setValue={actions.handleContractorChange}
            handleInputChange={actions.handleInputChange}
            setDevice={setters.setDevice}
            selectedValuesMemo={state.device.provider || ""}
          />
          <form className={styles["additional-form"]}>
            <Textarea
              setText={(e) => actions.handleInputChange("description", e.target.value)}
              value={state.device.description || ""}
              label={description} 
              errors={state.errors} 
              name="description"
              />
            <Actions isUpdate={state.isUpdate} resetDevice={actions.handleResetDevice} addDevice={actions.handleAddDevice} />
          </form>
        </div>
      </article>
    </>
  );
};
export default UpdateDeviceForm;

