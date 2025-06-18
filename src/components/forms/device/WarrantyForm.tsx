import Input from "../../ui/input/Input";
import Select from "../../ui/select/Select";
import Ask from "./Ask";
import { ModalType } from "../../../reducers/modal/modalTypes";
import { useGetContractorsQuery } from "../../../store/api/contractorApi";
import {startWarrantyLabel, endWarrantyLabel, selectDate, warrantyNumber,
  contractor } from "../../../utils/constants/device";
  import { useGlobalModal } from "../../../hooks/data/useGlobalModal";
import { addNewContractor } from "../../../utils/constants/constants";
import { Device, DeviceFormActions } from "../../../types/devices";
import { Contractor } from "../../../types/content";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import { ru } from "date-fns/locale/ru";
import { CiCalendar } from "react-icons/ci";
import styles from "./DeviceForm.module.scss";

registerLocale("ru", ru);

interface WarrantyFormProps<T> {
  state: Device;
  errors: Record<string, string>;
  isUpdate: boolean;
  actions: DeviceFormActions;
  getId: (item: T) => void;
}
const WarrantyForm = <T,>({
  state,
  actions,
  errors,
  isUpdate,
}: WarrantyFormProps<T>) => {
  const { openModal } = useGlobalModal();
  const { data: contractors } = useGetContractorsQuery();

  const openEntityModal = (type: ModalType, title: string) => {
      openModal(type, {
        title,
        maxWidth: 340,
        state: {},
        actions,
      });
    };

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
          selected={
            state.startWarrantyDate
              ? new Date(state.startWarrantyDate)
              : null
          }
          onChange={(date) => actions.handleStartDateChange(date)}
          maxDate={state.endWarrantyDate ?? undefined}
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
          selected={state.endWarrantyDate
            ? new Date(state.endWarrantyDate)
            : null
          }
          onChange={(date) => actions.handleEndDateChange(date)}
          minDate={state.startWarrantyDate ?? undefined}
          placeholderText={selectDate}
        />
        <div className={styles.label}>{endWarrantyLabel}</div>
      </div>
      <div className={styles.container}>
        {!isUpdate &&
          <Ask onAsk={() => openEntityModal('contractor', addNewContractor)} />
        }
        <Select<Contractor>
          setValue={actions.handleContractorChange}
          items={(contractors || []) as Contractor[]}
          label={contractor}
          value={state.providerName}
          errors={errors}
          name="provider"
          getId={(item) => item.id}
          getLabel={(item) => item.name}
          getComment={(item) => item.comment}
        />
      </div>
      <Input
        type="text"
        name="warrantyNumber"
        value={state.warrantyNumber || ""}
        label={warrantyNumber}
        errors={errors}
        onChange={(e) =>
          actions.handleInputChange("warrantyNumber", e.target.value)
        }
      />
    </form>
  );
};

export default WarrantyForm;
