import { FC, useState} from "react";
import Input from "../../ui/input/Input";
import Select from "../../ui/select/Select";
import { manufacturersLabel, deviceType, deviceTypeLabel,
  deviceName, serialNumber, inventoryNumber, location, description,
  modelCode, modelLabel } from "../../../utils/constants/device";
import { addNewDeviceTitle, add, reset, yes, 
no, serviceable, addDeviceModel, addDeviceType, addDeviceManufacturer } from "../../../utils/constants/constants";
import { useGetManufacturersQuery, useGetTypesQuery} from "../../../store/api/devicesApi";
import { deviceTypes} from "../../../utils/constants/device";
import Textarea from "../../ui/textarea/Textarea";
import Toggle from "../../ui/checkbox/Toggle";
import Preview from "../../ui/preview/Preview";
import Number from "../../ui/number/Number";
import EntityForm from "./EntityForm";
import CustomNumber from "../../ui/number/CustomNumber";
import BtnAction from "../../ui/buttons/BtnAction";
import { useAddDevice } from "../../../hooks/data/useAddDevice";
import { useModal } from "../../../hooks/data/useModal";
import Modal from "../../modal/Modal";
import {faPlus, faCircleXmark} from "@fortawesome/free-solid-svg-icons";
import style from "./DeviceForm.module.scss";

const AddDeviceForm: FC = () => {
  const { device, media, itemType, errors,  checked,
    handleMedia, handleNumber, handleExtNumber, handleAddDevice,
    handleResetDevice, setItemType, handleInputChange, handleChecked, selectedValues} = useAddDevice();
  const {isOpen, setIsOpen} = useModal(false);
  const {data: manufacturers} = useGetManufacturersQuery();
  const {data: types} = useGetTypesQuery();
  const [fieldType, setFieldType] = useState('');

  return (
    <>
      {isOpen && (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
          <EntityForm fieldType={fieldType}/>
        </Modal>
      )}
      <div className={style.title}>{addNewDeviceTitle}</div>
      <div className={style.info}>
        <div className={style.preview}>
          <Preview setMedia={handleMedia} prevImg={media?.prevImg} />
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
              setValue={(item) => {
                handleInputChange("type", item);
                setItemType(item.slug);
              }}
              items={types || []}
              label={deviceTypeLabel}
              value={selectedValues["type"]}
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
                  setValue={(item) => {
                    handleInputChange("manufacturer", item);
                    setItemType(item.slug);
                  }}
                  items={manufacturers || []}
                  label={manufacturersLabel}
                  value={selectedValues["manufacturer"]}
                  errors={errors}
                  name="manufacturer"
                />
            </div>
            {device.type && device.manufacturer && (
              <div className={style.container}>
                <div className={style.ask}>
                  {addDeviceModel}
                  <span onClick={() => {
                    setIsOpen(!isOpen)
                    setFieldType('model')
                  }}>{add}</span>
                </div>
                <Select setValue={(item) => {handleInputChange("modelId", item.name)}}
                  items={manufacturers!}
                  label={modelLabel}
                  value={selectedValues["model"]}
                  errors={errors}
                  name="model"
                />
              </div>
            )}
            <Input
              onChange={(e) =>  handleInputChange("serialNumber", e.target.value)}
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
            <Select setValue={(item) => { handleInputChange("warehouseId", item.name)}}
              items={manufacturers!}
              label={location}
              value={selectedValues["warehouseId"]}
              errors={errors}
              name="warehouseId"
            />
            <Number device={device} setDevice={handleNumber} />
            <Toggle
              checked={checked}
              setChecked={handleChecked}
              label={serviceable}
              leftPosition={no}
              rightPosition={yes}
            />
          </form>
          <form className={style["additional-form"]}>
            {itemType && deviceTypes[itemType]?.uniqueFields?.map((item) => (
                <CustomNumber
                  key={item.name}
                  device={device}
                  setDevice={handleExtNumber}
                  item={item}
                  errors={errors}
                />
              ))}
            <Textarea
              setText={(e) => handleInputChange("description", e.target.name)}
              value={device.description || ""}
              label={description}
            />
          </form>
        </div>
      </div>
      <div className={style.action}>
        <BtnAction
          icon={faCircleXmark}
          type="button"
          size="lg"
          color="red"
          title={reset}
          click={handleResetDevice}
        />
        <BtnAction
          icon={faPlus}
          type="submit"
          size="lg"
          color="grey"
          title={add}
          click={handleAddDevice}
        />
      </div>
    </>
  );
};
export default AddDeviceForm;

