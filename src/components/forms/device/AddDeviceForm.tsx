import { FC} from "react";
import Input from "../../ui/input/Input";
import Select from "../../ui/select/Select";
import { manufacturers, manufacturersLabel, deviceType, deviceTypeLabel,
  deviceName, serialNumber, inventoryNumber, location, description,
  modelCode, modelLabel } from "../../../utils/constants/device";
import { addNewDeviceTitle, add, reset, yes, 
no, serviceable, addDeviceModel } from "../../../utils/constants/constants";
import { deviceTypes, locations } from "../../../utils/constants/device";
import Textarea from "../../ui/textarea/Textarea";
import Toggle from "../../ui/checkbox/Toggle";
import Preview from "../../ui/preview/Preview";
import Number from "../../ui/number/Number";
import AddModalForm from "../modal/AddModalForm";
import CustomNumber from "../../ui/number/CustomNumber";
import BtnAction from "../../ui/buttons/BtnAction";
import { useAddDevice } from "../../../hooks/data/useAddDevice";
import { useModal } from "../../../hooks/data/useModal";
import Modal from "../../modal/Modal";
import {faPlus, faCircleXmark} from "@fortawesome/free-solid-svg-icons";
import style from "./AddDeviceForm.module.scss";

const AddDeviceForm: FC = () => {
  const { device, media, itemType, errors,  checked,
    handleMedia, handleNumber, handleExtNumber, handleAddDevice,
    handleResetDevice, setItemType, handleUpdateDevice, handleChecked, selectedValues} = useAddDevice();
  const {isOpen, setIsOpen} = useModal(false);

  return (
    <>
      {isOpen && (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}><AddModalForm/></Modal>
      )}
      <div className={style.title}>{addNewDeviceTitle}</div>
      <div className={style.info}>
        <div className={style.preview}>
          <Preview setMedia={handleMedia} prevImg={media?.prevImg} />
        </div>
        <div className={style.forms}>
          <form className={style.form}>
            <Input
              onChange={(e) => handleUpdateDevice("name", e.target.value)}
              type={"text"}
              value={device.name}
              label={deviceName}
              errors={errors}
              name="name"
            />
            <Select
              setValue={(item) => {
                handleUpdateDevice("type", item.name);
                setItemType(item.value);
              }}
              items={deviceType}
              label={deviceTypeLabel}
              value={selectedValues["type"]}
              errors={errors}
              name="type"
            />
            <Select
              setValue={(item) => {
                handleUpdateDevice("manufacturer", item.name);
              }}
              items={manufacturers}
              label={manufacturersLabel}
              value={selectedValues["manufacturer"]}
              errors={errors}
              name="manufacturer"
            />
            {device.type && device.manufacturer && (
              <div className={style.container}>
                <div className={style.ask}>
                  {addDeviceModel}
                  <span onClick={() => setIsOpen(!isOpen)}>{add}</span>
                </div>
                <Select setValue={(item) => {handleUpdateDevice("manufacturer", item.name)}}
                  items={manufacturers}
                  label={modelLabel}
                  value={selectedValues["manufacturer"]}
                  errors={errors}
                  name="model"
                />
              </div>
            )}
            <Input
              onChange={(e) =>  handleUpdateDevice("serialNumber", e.target.value)}
              type={"text"}
              value={device.serialNumber || ""}
              label={serialNumber}
              errors={errors}
              name="serialNumber"
            />
            <Input
              onChange={(e) => handleUpdateDevice("inventoryNumber", e.target.value)}
              type={"text"}
              value={device.inventoryNumber || ""}
              label={inventoryNumber}
              errors={errors}
              name="inventoryNumber"
            />
            <Input
              onChange={(e) => handleUpdateDevice("modelCode", e.target.value)}
              type={"text"}
              value={device.modelCode || ""}
              label={modelCode}
              errors={errors}
              name="modelCode"
            />
            <Select setValue={(item) => { handleUpdateDevice("warehouseId", item.name)}}
              items={locations}
              label={location}
              value={selectedValues["location"]}
              errors={errors}
              name="location"
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
              setText={(e) => handleUpdateDevice("description", e.target.value)}
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

