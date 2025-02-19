import { FC, useEffect, useState} from "react";
import Input from "../../ui/input/Input";
import Select from "../../ui/select/Select";
import { manufacturersLabel, deviceTypeLabel,deviceName, serialNumber, inventoryNumber, 
  location, description, modelCode, modelLabel } from "../../../utils/constants/device";
import { useGetWarehousesQuery } from "../../../store/api/warehousesApi";
import { useGetManufacturersQuery, useGetTypesQuery, useGetModelsQuery} from "../../../store/api/devicesApi";
import Textarea from "../../ui/textarea/Textarea";
import Toggle from "../../ui/checkbox/Toggle";
import Number from "../../ui/number/Number";
import EntityForm from "./EntityForm";
import CustomNumber from "../../ui/number/CustomNumber";
import BtnAction from "../../ui/buttons/BtnAction";
import Modal from "../../modal/Modal";
import { useAddDevice } from "../../../hooks/data/useAddDevice";
import { useModal } from "../../../hooks/data/useModal";
import { IEntity } from "../../../types/devices";
import { addNewDeviceTitle, add, reset, yes, no, serviceable, addDeviceModel, 
  addDeviceType, addDeviceManufacturer } from "../../../utils/constants/constants";
import { deviceTypes} from "../../../utils/constants/device";
import previewPicture from '../../../assets/elements/default.png';
import { GoPlus } from "react-icons/go";
import { HiMiniXMark } from "react-icons/hi2";
import style from "./DeviceForm.module.scss";

const AddDeviceForm: FC = () => {
  const {typeId, manufacturerId, device, itemType, errors,  checked, selectedValues, 
    selectedValuesMemo, devicePic, title, fieldType, setFieldType, handleNumber, handleExtNumber, handleAddDevice,
    handleResetDevice, setSelectedValues, setDevice, handleInputChange, handleChecked, handleModelChange, handleTypeChange, 
    handleManufacturerChange, handleWarehouseChange, setDevicePic} = useAddDevice();

  const { isOpen, setIsOpen } = useModal(false);
  const [skip, setSkip] = useState(true);
  const { data: manufacturers } = useGetManufacturersQuery();
  const { data: types } = useGetTypesQuery();
  const { data: models } = useGetModelsQuery(
    { manufacturer: device.manufacturer, type: device.type }, { skip: skip });
  const { data: warehouses } = useGetWarehousesQuery();
  
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

  console.log(device);
  

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
      {isOpen &&  (
        <Modal title={title} isOpen={isOpen} setIsOpen={setIsOpen}>
          <EntityForm typeId={typeId} manufacturerId={manufacturerId} fieldType={fieldType}/>
        </Modal>
      )}
      <div className={style.title}>{addNewDeviceTitle}</div>
      <div className={style.info}>
        <div className={style.preview}>
          <img src={devicePic
            ? `${import.meta.env.VITE_API_MODELS}${devicePic}`
            : previewPicture
          } alt="" />
        </div>
        <div className={style.forms}>
          <form className={style.form}>
            <Input
              onChange={(e) => handleInputChange("name", e.target.value)}
              type={"text"}
              value={device.name}
              label={deviceName}
              errors={errors}
              name="name"
            />
             <div className={style.container}>
                <div className={style.ask}>
                  {addDeviceType}
                  <span onClick={() => {
                    setIsOpen(!isOpen)
                    setFieldType('type')
                  }}>{add}</span>
                </div>
            <Select
              setValue={handleTypeChange}
              items={types || []}
              label={deviceTypeLabel}
              value={selectedValuesMemo["type"]}
              errors={errors}
              name="type"
            />
            </div>
             <div className={style.container}>
                <div className={style.ask}>
                  {addDeviceManufacturer}
                  <span onClick={() => {
                    setIsOpen(!isOpen)
                    setFieldType('manufacturer')
                  }}>{add}</span>
                </div>
                <Select
                  setValue={handleManufacturerChange}
                  items={manufacturers || []}
                  label={manufacturersLabel}
                  value={selectedValuesMemo["manufacturer"]}
                  errors={errors}
                  name="manufacturer"
                />
            </div>
            {typeId && manufacturerId && (
              <div className={style.container}>
                <div className={style.ask}>
                  {addDeviceModel}
                  <span onClick={() => {
                    setIsOpen(!isOpen)
                    setFieldType('model')
                  }}>{add}</span>
                </div>
                <Select setValue={handleModelChange}
                  items={models || []}
                  label={modelLabel}
                  value={selectedValuesMemo["modelName"]}
                  errors={errors}
                  name="modelName"
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
            <Select setValue={handleWarehouseChange}
              items={warehouses || []}
              label={location}
              value={selectedValues["warehouseName"]}
              errors={errors}
              name="warehouseId"
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
          <form className={style["additional-form"]}>
            <Textarea
              setText={(e) => handleInputChange("description", e.target.value)}
              value={device.description || ""}
              label={description}
            />
             <div className={style.action}>
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
                color="blue"
                title={add}
                click={handleAddDevice}
              />
      </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default AddDeviceForm;

