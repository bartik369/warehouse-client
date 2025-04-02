import { FC, useEffect, useState } from "react";
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
import { useAddDevice } from "../../../hooks/data/useAddDevice";
import { useModal } from "../../../hooks/data/useModal";
import { useAppDispatch } from "../../../hooks/redux/useRedux";
import { setDevicePic } from "../../../store/slices/deviceSlice";
import { useGetWarehousesQuery } from "../../../store/api/warehousesApi";
import { useLazyGetModelsQuery } from "../../../store/api/modelsApi";
import { useGetTypesQuery } from "../../../store/api/typesApi";
import { useGetManufacturersQuery } from "../../../store/api/manufacturersApi";
import { IDevice, IEntity } from "../../../types/devices";
import { IAdminEntity, IContractor } from "../../../types/content";
import { Bounce, ToastContainer } from "react-toastify";
import { yes, no, serviceable, technicalOptions, financialOptions,
  warrantyOptions } from "../../../utils/constants/constants";
import {
  manufacturersLabel, deviceTypeLabel, deviceName, serialNumber, inventoryNumber,
  description, modelCode, modelLabel, location, deviceTypes
} from "../../../utils/constants/device";
import styles from "./DeviceForm.module.scss";

interface IUpdateDeviceFormProps {
  itemType: string;
  isUpdate: boolean;
  device: IDevice;
  selectedValues: Record<string, string>;
  modelFields: Record<string, string>,
  handleType:(item: IEntity) => void
  handleModel:(item: IEntity) => void
  handleManufacturer:(item: IEntity) => void
  handleWarehouse:(item: IEntity) => void
  handleContractor:(item: IContractor) => void
  handleInputChange: (name: keyof IDevice, e:any) => void
  resetModel: () => void;
  handleNumber: (num: number) => void;
  setDevice: (item: IDevice) => void;
}
const UpdateDeviceForm: FC<IUpdateDeviceFormProps> = ({ 
  itemType,
  isUpdate,
  device, 
  selectedValues,
  handleType,
  handleModel,
  handleManufacturer,
  handleWarehouse,
  handleContractor,
  handleInputChange,
  resetModel,
  handleNumber,
  setDevice,
}) => {
  const {errors, checked, handleExtNumber, handleAddDevice,
    handleResetDevice,handleChecked } = useAddDevice();

  const { isOpen, entity, setIsOpen, setEntity } = useModal(false);
  const { data: manufacturers } = useGetManufacturersQuery();
  const { data: warehouses } = useGetWarehousesQuery();
  const { data: types } = useGetTypesQuery();
  const[ getModels, { data: models } ] = useLazyGetModelsQuery();
  const dispatch = useAppDispatch();

  // Allow model query by manufacturer and type
  useEffect(() => {
    if (device.modelName && models) {
      models.forEach((model: IAdminEntity) => {
        if (model.name === device.modelName) {
          dispatch(setDevicePic(model.imagePath || ''))
        }
      });
    }
  }, [device.modelName, models]);

  // Resetting the model and preview of the device when changing the manufacturer and type
  useEffect(() => {
    if (device.manufacturer && device.type) {
      getModels({ manufacturer: device.manufacturer, type: device.type })
      resetModel();
    }
  }, [device.manufacturer, device.type]);

  return (
    <>
    <ToastContainer position="top-center" theme="light" transition={Bounce} />
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
              <Select<IEntity>
                setValue={handleType}
                items={types || []}
                label={deviceTypeLabel}
                value={selectedValues["type"]}
                errors={errors}
                name="type"
                getId={(item:IEntity) => item.id}
              />
            </div>
            <div className={styles.container}>
              <Select<IEntity>
                setValue={handleManufacturer}
                items={manufacturers || []}
                label={manufacturersLabel}
                value={selectedValues["manufacturer"]}
                errors={errors}
                name="manufacturer"
                getId={(item:IEntity) => item.id}
              />
            </div>
            {(selectedValues['manufacturer'] && selectedValues['type']) && (
              <div className={styles.container}>
                <Select<IEntity>
                  setValue={handleModel}
                  items={models || []}
                  label={modelLabel}
                  value={selectedValues["modelName"]}
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
              setValue={handleWarehouse}
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
          <PriceForm  device={device} errors={errors} handleExtNumber={handleExtNumber} />
          <div className={styles.title}>{warrantyOptions}</div>
          <WarrantyForm
            getId={(item:IContractor) => item.id}
            device={device}
            entity={entity} 
            isOpen={isOpen}
            setIsOpen={setIsOpen} 
            setEntity={setEntity} 
            setValue={handleContractor}
            handleInputChange={handleInputChange}
            setDevice={setDevice}
            selectedValuesMemo={device.provider || ""}
          />
          <form className={styles["additional-form"]}>
            <Textarea
              setText={(e) => handleInputChange("description", e.target.value)}
              value={device.description || ""}
              label={description} 
              errors={errors} 
              name="description"
              />
            <Actions isUpdate={isUpdate} resetDevice={handleResetDevice} addDevice={handleAddDevice} />
          </form>
        </div>
      </article>
    </>
  );
};
export default UpdateDeviceForm;

