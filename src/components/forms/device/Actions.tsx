import BtnAction from '../../ui/buttons/BtnAction';
import { BUTTON_LABELS } from '../../../utils/constants/ui/buttons';
import { GoPlus } from 'react-icons/go';
import { HiMiniXMark } from 'react-icons/hi2';
import styles from "./DeviceForm.module.scss";

interface ActionsProps {
    isUpdate?: boolean;
    resetEntity: () => void;
    addEntity: () => void;
}
const Actions = ({ isUpdate, resetEntity, addEntity }: ActionsProps) => {
    return (
        <div className={styles.actions}>
        <BtnAction
          icon={<HiMiniXMark />}
          size="lg"
          color="grey"
          title={BUTTON_LABELS.reset}
          click={resetEntity}
        />
        <BtnAction
          icon={<GoPlus />}
          size="lg"
          color="green"
          title={isUpdate ? BUTTON_LABELS.update : BUTTON_LABELS.add}
          click={addEntity}
        />
      </div>
    );
};

export default Actions;