import Input from "../../ui/input/Input";
import Select from "../../ui/select/Select";
import { useGetContractorsQuery } from "../../../store/api/contractorApi";
import { add, isExistingInList } from "../../../utils/constants/constants";
import { startWarrantyLabel, endWarrantyLabel, selectDate, warrantyNumber,
  contractor } from "../../../utils/constants/device";
import { IUpdateDeviceFormActions, IUpdateDeviceFormSetters, 
  IUpdateDeviceFormState } from "../../../types/devices";
import { IContractor } from "../../../types/content";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import { ru } from "date-fns/locale/ru";
import { CiCalendar } from "react-icons/ci";
import styles from "./DeviceForm.module.scss";

registerLocale('ru', ru);

interface IWarrantyFormProps<T> {
  isOpen: boolean;
  entity: string;
  setIsOpen: (isOpen: boolean) => void;
  setEntity: (entity: string) => void;
  getId: (item: T) => void;
  state: IUpdateDeviceFormState;
  setters: IUpdateDeviceFormSetters;
  actions: IUpdateDeviceFormActions;
}
const WarrantyForm = <T,>({
  isOpen,
  state,
  actions,
  setters,
  setIsOpen,
  setEntity,
}: IWarrantyFormProps<T>) => {
  const { data: contractors } = useGetContractorsQuery();
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
          selected={state.device.startWarrantyDate 
            ? new Date(state.device.startWarrantyDate ) 
            : null}
            onChange={(date) => actions.handleStartDateChange(date)}
          maxDate={state.device.endWarrantyDate ?? undefined}
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
            state.device.endWarrantyDate  ? new Date(state.device.endWarrantyDate) : null
          }
          onChange={(date) => actions.handleEndDateChange(date)}
          minDate={state.device.startWarrantyDate ?? undefined}
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
              setters.setFieldType('contactor');
              setEntity('contactor');
            }}
          >
            {add}
          </span>
        </div>
        <Select<IContractor>
          setValue={actions.handleContractorChange}
          items={contractors || []}
          label={contractor}
          value={state.device.providerName}
          errors={state.errors}
          name="provider"
          getId={(item: IContractor) => item.id}
        />
      </div>
      <Input
        type="text"
        name="warrantyNumber"
        value={state.device.warrantyNumber || ""}
        label={warrantyNumber}
        errors={state.errors}
        onChange={(e) => actions.handleInputChange('warrantyNumber', e.target.value)}
      />
    </form>
  );
};

export default WarrantyForm;
