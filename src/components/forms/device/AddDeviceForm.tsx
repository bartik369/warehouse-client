import { FC, useState } from "react";
import Input from "../../ui/input/Input";
import Select from "../../ui/select/Select";
import { manufacturers, manufacturersLabel, deviceType, deviceTypeLabel,
  deviceName, serialNumber, inventoryNumber, location, description,
  modelCode } from "../../../utils/constants/device";
import { addNewDeviceTitle, add, reset } from "../../../utils/constants/constants";
import Textarea from "../../ui/textarea/Textarea";
import { locations } from "../../../utils/constants/device";
import Toggle from "../../ui/checkbox/Toggle";
import Checkbox from "../../ui/checkbox/Checkbox";
import File from "../../ui/file/File";
import Preview from "../../ui/preview/Preview";
import Number from "../../ui/number/Number";
import { deviceTypes } from "../../../utils/constants/device";
import CustomNumber from "../../ui/number/CustomNumber";
import BtnAction from "../../ui/buttons/BtnAction";
import { useAddDevice } from "../../../hooks/data/useAddDevice";
import {faPlus, faCircleXmark} from "@fortawesome/free-solid-svg-icons";
import style from "./AddDeviceForm.module.scss";

const AddDeviceForm: FC = () => {
  const [checked, setChecked] = useState(false);
  const { device, media, itemType,
    mediaHandler,numberHandler, extNumberHandler, addDeviceHandler,
    resetDeviceHandler, setItemType, updateDevice, selectedValues} = useAddDevice();

  return (
    <>
      <div className={style.title}>{addNewDeviceTitle}</div>
      <div className={style.info}>
        <div className={style.picture}>
          <Preview setMedia={mediaHandler} prevImg={media?.prevImg} />
        </div>
        <form className={style.form}>
          <Input
            onChange={(e) => updateDevice("name", e.target.value)}
            type={"text"}
            value={device.name}
            label={deviceName}
          />
          <Select
            setValue={(item) => {
              updateDevice("type", item.name);
              setItemType(item.value);
            }}
            items={deviceType}
            label={deviceTypeLabel}
            value={selectedValues["type"]}

            />
          <Select
            setValue={(item) => {
              updateDevice("manufacturer", item.name);
            }}
            items={manufacturers}
            label={manufacturersLabel}
            value={selectedValues["manufacturer"]}
            
          />
          <Input
            onChange={(e) => updateDevice("serialNumber", e.target.value)}
            type={"text"}
            value={device.serialNumber || ""}
            label={serialNumber}
          />
          {/* <Checkbox items={deviceType} label={deviceTypeLabel}/> */}
          <Input
            onChange={(e) => updateDevice("inventoryNumber", e.target.value)}
            type={"text"}
            value={device.inventoryNumber || ""}
            label={inventoryNumber}
          />
          <Input
            onChange={(e) => updateDevice("modelCode", e.target.value)}
            type={"text"}
            value={device.modelCode || ""}
            label={modelCode}
          />
          <Number device={device} setDevice={numberHandler} />
          {itemType && deviceTypes[itemType]?.uniqueFields?.map((item) => (
              <CustomNumber
                key={item.name}
                device={device}
                setDevice={extNumberHandler}
                item={item}
              />
            ))}
          <Select
            setValue={(item) => {
              updateDevice("location", item.name);
            }}
            items={locations}
            label={location}
            value={selectedValues["location"]}
          />
          <Textarea
            setText={(e) => updateDevice("description", e.target.value)}
            value={device.description || ""}
            label={description}
          />
        </form>
      </div>
      <div className={style.action}>
        <BtnAction 
          icon={faCircleXmark}
          type="button" 
          size="lg"
          color="red" 
          title={reset} 
          click={resetDeviceHandler}
        />
        <BtnAction 
          icon={faPlus} 
          type="submit" 
          size="lg"
          color="grey"
          title={add} 
          click={addDeviceHandler}
        />
      </div>
    </>
  );
};

export default AddDeviceForm;

{
  /* <File media={mediaHandler}/> */
}
{
  /* <Toggle 
                checked={checked} 
                setChecked={() => setChecked(!checked)}
                leftPosition={no}
                rightPosition={yes}
            /> */
}
