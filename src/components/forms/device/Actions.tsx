import BtnAction from '@/components/ui/buttons/BtnAction';
import { BUTTON_LABELS } from '@/utils/constants/ui/buttons';
import { COLORS } from '@/utils/constants/ui/colors';
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
          color={COLORS.grey}
          title={BUTTON_LABELS.reset}
          click={resetEntity}
        />
        <BtnAction
          icon={<GoPlus />}
          size="lg"
          color={COLORS.darkGreen}
          title={isUpdate ? BUTTON_LABELS.update : BUTTON_LABELS.add}
          click={addEntity}
        />
      </div>
    );
};

export default Actions;