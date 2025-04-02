import { FC } from 'react';
import BtnAction from '../../ui/buttons/BtnAction';
import { add, reset, update } from '../../../utils/constants/constants';
import { GoPlus } from 'react-icons/go';
import { HiMiniXMark } from 'react-icons/hi2';
import styles from "./DeviceForm.module.scss";

interface IActionsProps {
    isUpdate?: boolean;
    resetDevice: () => void;
    addDevice: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
const Actions:FC<IActionsProps> = ({ isUpdate, resetDevice, addDevice}) => {
    return (
        <div className={styles.actions}>
        <BtnAction
          icon={<HiMiniXMark />}
          type="button"
          size="lg"
          color="grey"
          title={reset}
          click={resetDevice}
        />
        <BtnAction
          icon={<GoPlus />}
          type="submit"
          size="lg"
          color="blue"
          title={isUpdate ? update : add}
          click={addDevice}
        />
      </div>
    );
};

export default Actions;