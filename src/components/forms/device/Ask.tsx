import { BUTTON_LABELS } from "@/utils/constants/ui/buttons";
import { MESSAGES } from "@/utils/constants/ui/messages";
import styles from "./DeviceForm.module.scss";

interface AskProps {
  onAsk: () => void;
}
const Ask = ({ onAsk }: AskProps) => {

  return (
    <div className={styles.ask}>
      {MESSAGES.isExistingInList}
      <span onClick={onAsk}>{BUTTON_LABELS.add}</span>
    </div>
  );
};

export default Ask;
