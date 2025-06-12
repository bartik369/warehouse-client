import Input from "../../ui/input/Input";
import Select from "../../ui/select/Select";
import Ask from "./Ask";
import { ModalType } from "../../../reducers/modal/modalTypes";
import { useGetContractorsQuery } from "../../../store/api/contractorApi";
import {startWarrantyLabel, endWarrantyLabel, selectDate, warrantyNumber,
  contractor } from "../../../utils/constants/device";
  import { useGlobalModal } from "../../../hooks/data/useGlobalModal";
import { addNewContractor } from "../../../utils/constants/constants";
import { IDeviceFormActions, IDeviceFormState } from "../../../types/devices";
import { IContractor } from "../../../types/content";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import { ru } from "date-fns/locale/ru";
import { CiCalendar } from "react-icons/ci";
import styles from "./DeviceForm.module.scss";

registerLocale("ru", ru);

interface IWarrantyFormProps<T> {
  state: IDeviceFormState;
  actions: IDeviceFormActions;
  getId: (item: T) => void;
}
const WarrantyForm = <T,>({
  state,
  actions,
}: IWarrantyFormProps<T>) => {
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
            state.device.startWarrantyDate
              ? new Date(state.device.startWarrantyDate)
              : null
          }
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
          selected={state.device.endWarrantyDate
            ? new Date(state.device.endWarrantyDate)
            : null
          }
          onChange={(date) => actions.handleEndDateChange(date)}
          minDate={state.device.startWarrantyDate ?? undefined}
          placeholderText={selectDate}
        />
        <div className={styles.label}>{endWarrantyLabel}</div>
      </div>
      <div className={styles.container}>
        {!state.isUpdate &&
          <Ask onAsk={() => openEntityModal('contractor', addNewContractor)} />
        }
        <Select<IContractor>
          setValue={actions.handleContractorChange}
          items={(contractors || []) as IContractor[]}
          label={contractor}
          value={state.device.providerName}
          errors={state.errors}
          name="provider"
          getId={(item) => item.id}
          getLabel={(item) => item.name}
          getComment={(item) => item.comment}
        />
      </div>
      <Input
        type="text"
        name="warrantyNumber"
        value={state.device.warrantyNumber || ""}
        label={warrantyNumber}
        errors={state.errors}
        onChange={(e) =>
          actions.handleInputChange("warrantyNumber", e.target.value)
        }
      />
    </form>
  );
};

export default WarrantyForm;
