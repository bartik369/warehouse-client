import {FC} from "react";
import Input from "../../ui/input/Input";
import Select from "../../ui/select/Select";
import { add, addContractor } from "../../../utils/constants/constants";
import { useAddDevice } from "../../../hooks/data/useAddDevice";
import { contractor } from "../../../utils/constants/device";
import { startWarrantyLabel, endWarrantyLabel, selectDate } from "../../../utils/constants/device";
import DatePicker from "react-datepicker";
import { CiCalendar } from "react-icons/ci";
import { useGetWarehousesQuery } from "../../../store/api/warehousesApi";
import { addDeviceModel } from "../../../utils/constants/constants";
import styles from "./DeviceForm.module.scss";

interface IWarrantyFormProps {
  isOpen: boolean;
  entity: string;
  setIsOpen: (isOpen: boolean) => void;
  setEntity:(entity: string) => void;
}

const WarrantyForm:FC<IWarrantyFormProps> = ({isOpen, entity, setIsOpen, setEntity}) => {
  const { device, errors, selectedValuesMemo, setDevice, handleInputChange,
  handleManufacturerChange, setFieldType } = useAddDevice();
  const { data: warehouses } = useGetWarehousesQuery();
  return (
    <form className={styles.form4}>
       <Input
        type="text"
        name="warrantyNumber"
        value={device.warrantyNumber || ''}
        label='Номер гарантии'
        errors={errors}
        onChange={(e) => handleInputChange('warrantyNumber', e.target.value)}
        />
       <div className={styles.container}>
       <div className={styles.ask}>
                  {addContractor}
                  <span onClick={() => {
                    setIsOpen(!isOpen)
                    setFieldType("contactor")
                    setEntity("contactor")
                  }}>{add}</span>
          </div>
       <Select
        setValue={handleManufacturerChange}
        items={warehouses || []}
        label={contractor}
        value={selectedValuesMemo["warehouse"]}
        errors={errors}
        name="warehouse"
       />
      </div>

      <div className={styles.input}>
        <CiCalendar className={styles.icon}/>
            <DatePicker
                showIcon
                dateFormat="dd.MM.yyyy"
                selected={device.startWarrantyDate}
                onChange={(date) =>
                    setDevice((prev) => ({
                    ...prev,
                    startWarrantyDate: date
                    }))
                }
                maxDate={device.endWarrantyDate ?? undefined}
                placeholderText={selectDate}
            />
        <div className={styles.label}>{startWarrantyLabel}</div>
      </div>
      <div className={styles.input}>
      <CiCalendar className={styles.icon}/>
      <DatePicker
        showIcon
        dateFormat="dd.MM.yyyy"
        selected={device.endWarrantyDate}
        onChange={(date) =>
          setDevice((prev) => ({
            ...prev,
              endWarrantyDate: date,

          }))
        }
        minDate={device.startWarrantyDate ?? undefined}
        placeholderText={selectDate}
      />
      <div className={styles.label}>{endWarrantyLabel}</div>
      </div>
    </form>
  );
};

export default WarrantyForm;
