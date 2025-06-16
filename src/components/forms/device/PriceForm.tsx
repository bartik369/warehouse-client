import { devicePrices } from "../../../utils/constants/device";
import CustomNumber from "../../ui/number/CustomNumber";
import { Device } from "../../../types/devices";
import styles from "./DeviceForm.module.scss";

interface PriceFormProps {
  device: Device;
  errors: Record<string, string>;
  handleExtNumber: (entity: number, name: string) => void;
}

const PriceForm = ({ device, errors, handleExtNumber }: PriceFormProps) => {
  return (
    <form className={styles.form}>
      {devicePrices?.uniqueFields?.map((item) => (
        <CustomNumber
          key={item.name}
          device={device}
          setDevice={handleExtNumber}
          item={item}
          errors={errors}
        />
      ))}
    </form>
  );
};

export default PriceForm;
