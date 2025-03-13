import { FC, useEffect, useState } from "react";
import Input from "../../ui/input/Input";
import Select from "../../ui/select/Select";
import Textarea from "../../ui/textarea/Textarea";
import Toggle from "../../ui/checkbox/Toggle";
import Number from "../../ui/number/Number";
import EntityForm from "./EntityForm";
import CustomNumber from "../../ui/number/CustomNumber";
import BtnAction from "../../ui/buttons/BtnAction";
import Modal from "../../modal/Modal";
import PriceForm from "./PriceForm";
import { useAddDevice } from "../../../hooks/data/useAddDevice";
import { useModal } from "../../../hooks/data/useModal";
import { IContractor, IEntity } from "../../../types/devices";
import ContractorForm from "../contractor/ContractorForm";
import { Bounce, ToastContainer } from "react-toastify";
import WarrantyForm from "./WarrantyForm";
import {
  add, reset, yes, no, serviceable, isExistingInList, technicalOptions, financialOptions
} from "../../../utils/constants/constants";
import {
  manufacturersLabel, deviceTypeLabel, deviceName, serialNumber, inventoryNumber,
  description, modelCode, modelLabel, location
} from "../../../utils/constants/device";
import { useGetWarehousesQuery } from "../../../store/api/warehousesApi";
import { useGetManufacturersQuery, useGetTypesQuery, useGetModelsQuery 
} from "../../../store/api/devicesApi";
import { deviceTypes } from "../../../utils/constants/device";
import previewPicture from '../../../assets/elements/default.png';
import { GoPlus } from "react-icons/go";
import { HiMiniXMark } from "react-icons/hi2";
import styles from "./DeviceForm.module.scss";

const AddDeviceForm: FC = () => {
  const { typeId, manufacturerId, device, itemType, errors, checked, selectedValues,
    selectedValuesMemo, devicePic, title, fieldType, setFieldType, handleNumber, handleExtNumber, handleAddDevice,
    handleResetDevice, setSelectedValues, setDevice, handleInputChange, handleChecked, handleModelChange, handleTypeChange,
    handleManufacturerChange, handleWarehouseChange, setDevicePic, handleContractorChange } = useAddDevice();

  const [skip, setSkip] = useState(true);
  const { isOpen, entity, setIsOpen, setEntity } = useModal(false);
  const { data: manufacturers } = useGetManufacturersQuery();
  const { data: warehouses } = useGetWarehousesQuery();
  const { data: types } = useGetTypesQuery();
  const { data: models } = useGetModelsQuery(
    { manufacturer: device.manufacturer, type: device.type }, { skip: skip });

  // Allow model query by manufacturer and type
  useEffect(() => {
    if (device.modelName && models) {
      models.forEach((model: IEntity) => {
        if (model.name === device.modelName) {
          setDevicePic(model.imagePath || "");
        }
      });
    }
  }, [device.modelName]);

  // Resetting the model and preview of the device when changing the manufacturer and type
  useEffect(() => {
    if (device.manufacturer && device.type) {
      setSkip(false);
      resetModelData();
    } else {
      setSkip(true);
    }
  }, [device.manufacturer, device.type, models]);

  const resetModelData = () => {
    setDevice((prev) => ({
      ...prev,
      modelName: "",
    }));
    setSelectedValues((prev) => ({
      ...prev,
      modelName: "",
    }));
    setDevicePic("");
  };

  return (
    <>
    <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
      />
      {isOpen && (
        <Modal title={title} isOpen={isOpen} setIsOpen={setIsOpen}>
          {entity !== "contactor"
            ? <EntityForm
                typeId={typeId}
                manufacturerId={manufacturerId}
                fieldType={fieldType}
            />
            : <ContractorForm />
          }
        </Modal>
      )}
      <article className={styles.wrapper}>
        <figure className={styles.preview}>
          <img src={devicePic
            ? `${import.meta.env.VITE_API_MODELS}${devicePic}`
            : previewPicture
          } alt="" />
        </figure>
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
              <div className={styles.ask}>
                {isExistingInList}
                <span onClick={() => {
                  setIsOpen(!isOpen)
                  setFieldType("type")
                  setEntity("type")
                }}>{add}</span>
              </div>
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
              <div className={styles.ask}>
                {isExistingInList}
                <span onClick={() => {
                  setIsOpen(!isOpen)
                  setFieldType("manufacturer")
                  setEntity("manufacturer")
                }}>{add}</span>
              </div>
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
                <div className={styles.ask}>
                  {isExistingInList}
                  <span onClick={() => {
                    setIsOpen(!isOpen)
                    setFieldType("model")
                    setEntity("model")
                  }}>{add}</span>
                </div>
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
          <PriceForm 
            device={device} 
            handleExtNumber={handleExtNumber} 
            errors={errors}
          />
          <div className={styles.title}>Опции гарантии</div>
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
            <div className={styles.actions}>
              <BtnAction
                icon={<HiMiniXMark />}
                type="button"
                size="lg"
                color="grey"
                title={reset}
                click={handleResetDevice}
              />
              <BtnAction
                icon={<GoPlus />}
                type="submit"
                size="lg"
                color="blue-green"
                title={add}
                click={handleAddDevice}
              />
            </div>
          </form>
        </div>
      </article>
    </>
  );
};
export default AddDeviceForm;

