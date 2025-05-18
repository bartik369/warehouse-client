import { useEffect } from "react";
import Input from "../../ui/input/Input";
import Select from "../../ui/select/Select";
import Textarea from "../../ui/textarea/Textarea";
import Toggle from "../../ui/checkbox/Toggle";
import Number from "../../ui/number/Number";
import EntityForm from "./EntityForm";
import CustomNumber from "../../ui/number/CustomNumber";
import ContractorForm from "../contractor/ContractorForm";
import Actions from "./Actions";
import Modal from "../../modal/Modal";
import Ask from "./Ask";
import PriceForm from "./PriceForm";
import WarrantyForm from "./WarrantyForm";
import { ToastContainer } from "react-toastify";
import { useAddDevice } from "../../../hooks/data/useAddDevice";
import { useModal } from "../../../hooks/data/useModal";
import { useAppDispatch } from "../../../hooks/redux/useRedux";
import { setDevicePic } from "../../../store/slices/deviceSlice";
import { useGetWarehousesQuery } from "../../../store/api/warehousesApi";
import { useLazyGetModelsQuery } from "../../../store/api/modelsApi";
import { useGetTypesQuery } from "../../../store/api/typesApi";
import { useGetManufacturersQuery } from "../../../store/api/manufacturersApi";
import { IEntity } from "../../../types/devices";
import { IContractor } from "../../../types/content";
import { yes, no, serviceable, technicalOptions, financialOptions,
  warrantyOptions, 
  addNewType,
  addNewModel,
  addNewManufacturer} from "../../../utils/constants/constants";
import { manufacturersLabel, deviceTypeLabel, deviceName, serialNumber, inventoryNumber,
  description, modelCode, modelLabel, location, deviceTypes } from "../../../utils/constants/device";
  import DevicePreview from "./DevicePreview";
import styles from "./DeviceForm.module.scss";

const DeviceForm = () => {
  const { state, actions  } = useAddDevice();
  const { isOpen, setIsOpen  } = useModal(false);
  const { data: manufacturers } = useGetManufacturersQuery();
  const { data: warehouses } = useGetWarehousesQuery();
  const { data: types } = useGetTypesQuery();
  const [ getModels, { data: models }] = useLazyGetModelsQuery();
  const dispatch = useAppDispatch();

  // Allow model query by manufacturer and type
  useEffect(() => {
    if (state.device.modelName && models) {
      models.forEach((model: IEntity) => {
        if (model.name === state.device.modelName) {
          dispatch(setDevicePic(model.imagePath || ''))
        }
      });
    }
  }, [state.device.modelName, models, dispatch]);

  // Resetting the model and preview of the device when changing the manufacturer and type
  useEffect(() => {
    if (state.device.manufacturerSlug && state.device.typeSlug) {
      getModels({ manufacturer: state.device.manufacturerSlug, type: state.device.typeSlug });
      // resetModel();
    } 
  }, [state.device.manufacturerSlug, state.device.typeSlug, models]);
  // Reset image state after unmount 
  useEffect(() => {
    dispatch(setDevicePic(''))
  }, [dispatch]);

  return (
    <>
    <ToastContainer position="top-center" theme="light" />
      {isOpen && (
        <Modal title={state.title} isOpen={isOpen} setIsOpen={setIsOpen} maxWidth={540}>
          {state.fieldType !== "contractor"
            ? <EntityForm 
                typeId={state.typeId} 
                manufacturerId={state.manufacturerId} 
                fieldType={state.fieldType} 
            />
            : <ContractorForm />
          }
        </Modal>
      )}
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
            <Ask 
              title={addNewType}
              type="type"
              isOpen={isOpen} 
              setIsOpen={setIsOpen}
              actions={actions}
            />
              <Select<IEntity>
                setValue={actions.handleTypeChange}
                items={types || []}
                label={deviceTypeLabel}
                value={state.device.typeName || ""}
                errors={state.errors}
                name="typeName"
                getId={(item:IEntity) => item.id}
                getLabel={(item) => item.name}
              />
            </div>
            <div className={styles.container}>
              <Ask 
                title={addNewManufacturer}
                type="manufacturer"
                isOpen={isOpen} 
                setIsOpen={setIsOpen} 
                actions={actions}
              />
              <Select<IEntity>
                setValue={actions.handleManufacturerChange}
                items={manufacturers || []}
                label={manufacturersLabel}
                value={state.device.manufacturerName || ""}
                errors={state.errors}
                name="manufacturerName"
                getId={(item:IEntity) => item.id}
                getLabel={(item) => item.name}
              />
            </div>
            {state.device.typeSlug && state.device.manufacturerSlug && (
              <div className={styles.container}>
                <Ask 
                  title={addNewModel} 
                  type="model"
                  isOpen={isOpen} 
                  setIsOpen={setIsOpen} 
                  actions={actions}
                />
                <Select<IEntity>
                  setValue={actions.handleModelChange}
                  items={models || []}
                  label={modelLabel}
                  value={state.device.modelName || ""}
                  errors={state.errors}
                  name="modelName"
                  getId={(item:IEntity) => item.id}
                  getLabel={(item) => item.name}
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
              value={state.device.warehouseName || ""}
              errors={state.errors}
              name="warehouseId"
              getId={(item:IEntity) => item.id}
              getLabel={(item) => item.name}
            />
            <Number device={state.device} setDevice={actions.handleNumber} />
            {state.device.typeSlug && deviceTypes[state.device.typeSlug]?.uniqueFields?.map((item) => (
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
          <PriceForm device={state.device} errors={state.errors} handleExtNumber={actions.handleExtNumber} />
          <div className={styles.title}>{warrantyOptions}</div>
          <WarrantyForm
            getId={(item:IContractor) => item.id}
            isOpen={isOpen}
            state={state}
            actions={actions}
            setIsOpen={setIsOpen} 
          />
          <form className={styles["additional-form"]}>
            <Textarea
              onChange={(e) => actions.handleInputChange("description", e.target.value)}
              value={state.device.description || ""}
              label={description} 
              errors={state.errors} 
              name="description"
              />
            <Actions 
              resetEntity={actions.handleResetDevice} 
              addEntity={actions.handleAddDevice}
            />
          </form>
        </div>
      </article>
    </>
  );
};
export default DeviceForm;

