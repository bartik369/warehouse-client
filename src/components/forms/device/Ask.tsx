import { add, isExistingInList } from "../../../utils/constants/constants";
import styles from "./DeviceForm.module.scss";

interface IAskProps {
  onAsk: () => void;
}
const Ask = ({ onAsk }: IAskProps) => {

  return (
    <div className={styles.ask}>
      {isExistingInList}
      <span onClick={onAsk}>{add}</span>
    </div>
  );
};

export default Ask;
