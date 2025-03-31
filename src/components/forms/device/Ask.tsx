import { FC } from 'react';
import { add, isExistingInList } from '../../../utils/constants/constants';
import styles from "./DeviceForm.module.scss";

interface IAskProps {
    title: string;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    setFieldType: (item: string) => void
    setEntity: (item: string) => void
}

const Ask:FC<IAskProps> = ({ title, isOpen, setIsOpen, setFieldType, setEntity }) => {
    const handleClick = () => {
        setIsOpen(!isOpen);
        setFieldType(title)
        setEntity(title)
    }
    return (
        <div className={styles.ask}>
            {isExistingInList}
        <span onClick={handleClick}>{add}</span>
      </div>
    );
};

export default Ask;