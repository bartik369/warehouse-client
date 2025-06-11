import { add, isExistingInList } from "../../../utils/constants/constants";
import { IDeviceFormActions } from "../../../types/devices";
import styles from "./DeviceForm.module.scss";

interface IAskProps {
  title: string;
  type: string;
  isOpen: boolean;
  actions: IDeviceFormActions;
  setIsOpen: (isOpen: boolean) => void;
}
const Ask = ({ title, type, isOpen, actions, setIsOpen }: IAskProps) => {
  const handleClick = () => {
    setIsOpen(!isOpen);
    actions.handleSetTitle(title);
    actions.handleSetType(type);
  };
  return (
    <div className={styles.ask}>
      {isExistingInList}
      <span onClick={handleClick}>{add}</span>
    </div>
  );
};

export default Ask;
