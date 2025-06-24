import { isExistingInList } from "../../../utils/constants/constants";
import { BUTTON_LABELS } from "../../../utils/constants/ui/buttons";
import styles from "./DeviceForm.module.scss";

interface AskProps {
  onAsk: () => void;
}
const Ask = ({ onAsk }: AskProps) => {

  return (
    <div className={styles.ask}>
      {isExistingInList}
      <span onClick={onAsk}>{BUTTON_LABELS.add}</span>
    </div>
  );
};

export default Ask;
