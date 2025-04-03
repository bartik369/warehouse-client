import { FC, useEffect, useState } from "react";
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
import { IAdminEntity, IContractor } from "../../../types/content";
import { yes, no, serviceable, technicalOptions, financialOptions,
  warrantyOptions } from "../../../utils/constants/constants";
import { manufacturersLabel, deviceTypeLabel, deviceName, serialNumber, inventoryNumber,
  description, modelCode, modelLabel, location, deviceTypes } from "../../../utils/constants/device";
  import DevicePreview from "./DevicePreview";
import styles from "./DeviceForm.module.scss";

const DeviceForm: FC = () => {
  const { typeId, manufacturerId, device, itemType, errors, checked, selectedValues,
    selectedValuesMemo,title, fieldType, setFieldType, handleNumber, handleExtNumber, handleAddDevice,
    handleResetDevice, setDevice, handleInputChange, handleChecked, handleModelChange, handleTypeChange,
    handleManufacturerChange, handleWarehouseChange, handleContractorChange, resetModelData } = useAddDevice();
  const { isOpen, entity, setIsOpen, setEntity } = useModal(false);
  const { data: manufacturers } = useGetManufacturersQuery();
  const { data: warehouses } = useGetWarehousesQuery();
  const { data: types } = useGetTypesQuery();
  const [getModels, { data: models }] = useLazyGetModelsQuery();
  const dispatch = useAppDispatch();
  // const devicePic = useAppSelector(state => state.device.device?.prevImg);

  // Allow model query by manufacturer and type
  useEffect(() => {
    if (device.modelName && models) {
      models.forEach((model: IAdminEntity) => {
        if (model.name === device.modelName) {
          dispatch(setDevicePic(model.imagePath || ''))
        }
      });
    }
  }, [device.modelName]);

  // Resetting the model and preview of the device when changing the manufacturer and type
  useEffect(() => {
    if (device.manufacturer && device.type) {
      getModels({ manufacturer: device.manufacturer, type: device.type });
      // resetModelData();
    } 
  }, [device.manufacturer, device.type, models]);
  // Reset image state after unmount 
  useEffect(() => {
    dispatch(setDevicePic(''))
  }, [dispatch]);

  console.log(selectedValues);
  

  return (
    <>
    <ToastContainer position="top-center" theme="light" />
      {isOpen && (
        <Modal title={title} isOpen={isOpen} setIsOpen={setIsOpen} maxWidth={540}>
          {entity !== "contactor"
            ? <EntityForm typeId={typeId} manufacturerId={manufacturerId} fieldType={fieldType} />
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
              onChange={(e) => handleInputChange("name", e.target.value)}
              type="text"
              value={device.name}
              label={deviceName}
              errors={errors}
              name="name"
            />
            <div className={styles.container}>
            <Ask title="type" isOpen={isOpen} setIsOpen={setIsOpen} setFieldType={setFieldType} setEntity={setEntity} />
              <Select<IEntity>
                setValue={handleTypeChange}
                items={types || []}
                label={deviceTypeLabel}
                value={selectedValuesMemo["type"]}
                errors={errors}
                name="type"
                getId={(item:IEntity) => item.id}
              />
            </div>
            <div className={styles.container}>
              <Ask title="manufacturer" isOpen={isOpen} setIsOpen={setIsOpen} setFieldType={setFieldType} setEntity={setEntity} />
              <Select<IEntity>
                setValue={handleManufacturerChange}
                items={manufacturers || []}
                label={manufacturersLabel}
                value={selectedValuesMemo["manufacturer"]}
                errors={errors}
                name="manufacturer"
                getId={(item:IEntity) => item.id}
              />
            </div>
            {typeId && manufacturerId && (
              <div className={styles.container}>
                <Ask title="model" isOpen={isOpen} setIsOpen={setIsOpen} setFieldType={setFieldType} setEntity={setEntity}/>
                <Select<IEntity>
                  setValue={handleModelChange}
                  items={models || []}
                  label={modelLabel}
                  value={selectedValuesMemo["modelName"]}
                  errors={errors}
                  name="modelName"
                  getId={(item:IEntity) => item.id}
                />
              </div>
            )}
            <Input
              onChange={(e) => handleInputChange("serialNumber", e.target.value)}
              type={"text"}
              value={device.serialNumber || ""}
              label={serialNumber}
              errors={errors}
              name="serialNumber"
            />
            <Input
              onChange={(e) => handleInputChange("inventoryNumber", e.target.value)}
              type={"text"}
              value={device.inventoryNumber || ""}
              label={inventoryNumber}
              errors={errors}
              name="inventoryNumber"
            />
            <Input
              onChange={(e) => handleInputChange("modelCode", e.target.value)}
              type={"text"}
              value={device.modelCode || ""}
              label={modelCode}
              errors={errors}
              name="modelCode"
            />
            <Select<IEntity>
              setValue={handleWarehouseChange}
              items={warehouses || []}
              label={location}
              value={selectedValues["warehouseName"]}
              errors={errors}
              name="warehouseId"
              getId={(item:IEntity) => item.id}
            />
            <Number device={device} setDevice={handleNumber} />
            {itemType && deviceTypes[itemType]?.uniqueFields?.map((item) => (
              <CustomNumber
                key={item.name}
                device={device}
                setDevice={handleExtNumber}
                item={item}
                errors={errors}
              />
            ))}
            <Toggle
              checked={checked}
              setChecked={handleChecked}
              label={serviceable}
              leftPosition={no}
              rightPosition={yes}
            />
          </form>
          <div className={styles.title}>{financialOptions}</div>
          <PriceForm device={device} errors={errors} handleExtNumber={handleExtNumber} />
          <div className={styles.title}>{warrantyOptions}</div>
          <WarrantyForm
            getId={(item:IContractor) => item.id}
            device={device}
            entity={entity} 
            isOpen={isOpen}
            setIsOpen={setIsOpen} 
            setEntity={setEntity} 
            setValue={handleContractorChange}
            handleInputChange={handleInputChange}
            setDevice={setDevice}
            selectedValuesMemo={selectedValuesMemo["provider"]}
          />
          <form className={styles["additional-form"]}>
            <Textarea
              setText={(e) => handleInputChange("description", e.target.value)}
              value={device.description || ""}
              label={description} 
              errors={errors} 
              name="description"
              />
            <Actions resetDevice={handleResetDevice} addDevice={handleAddDevice}/>
          </form>
        </div>
      </article>
    </>
  );
};
export default DeviceForm;

