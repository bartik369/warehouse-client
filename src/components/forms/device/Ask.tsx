import { FC } from 'react';
import { add, isExistingInList } from '../../../utils/constants/constants';
import { IUpdateDeviceFormActions } from '../../../types/devices';
import styles from "./DeviceForm.module.scss";

interface IAskProps {
    title: string;
    type: string;
    isOpen: boolean;
    actions: IUpdateDeviceFormActions;
    setIsOpen: (isOpen: boolean) => void;
}
const Ask:FC<IAskProps> = ({ title, type, isOpen, actions, setIsOpen}) => {
    const handleClick = () => {
        setIsOpen(!isOpen);
        actions.handleSetTitle(title);
        actions.handleSetType(type);
    }
    return (
        <div className={styles.ask}>
            {isExistingInList}
        <span onClick={handleClick}>{add}</span>
      </div>
    );
};

export default Ask;