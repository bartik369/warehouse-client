import Input from "@/components/ui/input/Input";
import Select from "@/components/ui/select/Select";
import Ask from "./Ask";
import { ModalType } from "@/reducers/modal/modalTypes";
import { useGetContractorsQuery } from "@/store/api/contractorApi";
import { useGlobalModal } from "@/hooks/data/useGlobalModal";
import { Device, DeviceFormActions } from "@/types/devices";
import { Contractor } from "@/types/content";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import { ru } from "date-fns/locale/ru";
import { CiCalendar } from "react-icons/ci";
import { LABELS } from "@/utils/constants/ui/labels";
import { PLACEHOLDER_LABELS } from "@/utils/constants/ui/placeholders";
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
          placeholderText={PLACEHOLDER_LABELS.selectDate}
        />
        <div className={styles.label}>{LABELS.startWarranty}</div>
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
          placeholderText={PLACEHOLDER_LABELS.selectDate}
        />
        <div className={styles.label}>{LABELS.endWarranty}</div>
      </div>
      <div className={styles.container}>
        {!isUpdate &&
          <Ask onAsk={() => openEntityModal('contractor', LABELS.addContractor)} />
        }
        <Select<Contractor>
          setValue={actions.handleContractorChange}
          items={(contractors || []) as Contractor[]}
          label={LABELS.contractor}
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
        label={LABELS.warrantyNumber}
        errors={errors}
        onChange={(e) =>
          actions.handleInputChange("warrantyNumber", e.target.value)
        }
      />
    </form>
  );
};

export default WarrantyForm;
