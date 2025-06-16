import { add, isExistingInList } from "../../../utils/constants/constants";
import styles from "./DeviceForm.module.scss";

interface AskProps {
  onAsk: () => void;
}
const Ask = ({ onAsk }: AskProps) => {

  return (
    <div className={styles.ask}>
      {isExistingInList}
      <span onClick={onAsk}>{add}</span>
    </div>
  );
};

export default Ask;
