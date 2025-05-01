import BtnAction from '../../ui/buttons/BtnAction';
import { add, reset, update } from '../../../utils/constants/constants';
import { GoPlus } from 'react-icons/go';
import { HiMiniXMark } from 'react-icons/hi2';
import styles from "./DeviceForm.module.scss";

interface IActionsProps {
    isUpdate?: boolean;
    resetEntity: () => void;
    addEntity: () => void;
}
const Actions = ({ isUpdate, resetEntity, addEntity }: IActionsProps) => {
    return (
        <div className={styles.actions}>
        <BtnAction
          icon={<HiMiniXMark />}
          size="lg"
          color="grey"
          title={reset}
          click={resetEntity}
        />
        <BtnAction
          icon={<GoPlus />}
          size="lg"
          color="blue"
          title={isUpdate ? update : add}
          click={addEntity}
        />
      </div>
    );
};

export default Actions;