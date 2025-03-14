import { FC } from "react";
import Input from "../../ui/input/Input";
import Select from "../../ui/select/Select";
import { add, isExistingInList } from "../../../utils/constants/constants";
import { useAddDevice } from "../../../hooks/data/useAddDevice";
import { contractor } from "../../../utils/constants/device";
import {
  startWarrantyLabel,
  endWarrantyLabel,
  selectDate,
  warrantyNumber,
} from "../../../utils/constants/device";
import { IContractor, IDevice } from "../../../types/devices";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import { ru } from "date-fns/locale/ru";
import { CiCalendar } from "react-icons/ci";
import { useGetContractorQuery } from "../../../store/api/contractorApi";
import styles from "./DeviceForm.module.scss";

registerLocale("ru", ru);

interface IWarrantyFormProps<T> {
  selectedValuesMemo: string;
  device: IDevice;
  isOpen: boolean;
  entity: string;
  setValue: (value: T) => void;
  setDevice: (device: IDevice) => void;
  handleInputChange: (name: keyof IDevice, value: string) => void;
  setIsOpen: (isOpen: boolean) => void;
  setEntity: (entity: string) => void;
  getId: (item: T) => void;
}

const WarrantyForm = <T,>({
  selectedValuesMemo,
  isOpen,
  device,
  setDevice,
  setIsOpen,
  setEntity,
  handleInputChange,
  setValue,
}: IWarrantyFormProps<T>) => {
  const { errors,  setFieldType } = useAddDevice();
  const { data: contractors } = useGetContractorQuery();
  return (
    <form className={styles.form4}>
      <div className={styles.input}>
        <div className={styles.icon}>
          <CiCalendar />
        </div>
        <DatePicker
          locale="ru"
          showIcon
          dateFormat="dd.MM.yyyy"
          selected={device.startWarrantyDate 
            ? new Date(device.startWarrantyDate) 
            : null}
          onChange={(date) => {
            setDevice((prev) => ({
              ...prev,
              startWarrantyDate: date.toISOString() ?? null,
            }));
          }}
          maxDate={device.endWarrantyDate ?? undefined}
          placeholderText={selectDate}
        />
        <div className={styles.label}>{startWarrantyLabel}</div>
      </div>
      <div className={styles.input}>
        <div className={styles.icon}>
          <CiCalendar />
        </div>
        <DatePicker
          locale="ru"
          showIcon
          dateFormat="dd.MM.yyyy"
          selected={
            device.endWarrantyDate ? new Date(device.endWarrantyDate) : null
          }
          onChange={(date) =>
            setDevice((prev) => ({
              ...prev,
              endWarrantyDate: date.toISOString() ?? null,
            }))
          }
          minDate={device.startWarrantyDate ?? undefined}
          placeholderText={selectDate}
        />
        <div className={styles.label}>{endWarrantyLabel}</div>
      </div>
      <div className={styles.container}>
        <div className={styles.ask}>
          {isExistingInList}
          <span
            onClick={() => {
              setIsOpen(!isOpen);
              setFieldType("contactor");
              setEntity("contactor");
            }}
          >
            {add}
          </span>
        </div>
        <Select<IContractor>
          setValue={setValue}
          items={contractors || []}
          label={contractor}
          value={selectedValuesMemo}
          errors={errors}
          name="provider"
          getId={(item: IContractor) => item.id}
        />
      </div>
      <Input
        type="text"
        name="warrantyNumber"
        value={device.warrantyNumber || ""}
        label={warrantyNumber}
        errors={errors}
        onChange={(e) => handleInputChange("warrantyNumber", e.target.value)}
      />
    </form>
  );
};

export default WarrantyForm;
