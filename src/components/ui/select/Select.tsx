import {FC, useState} from 'react';
import { selectFromList } from '../../../utils/constants/device';
import {useOutsideClick} from '../../../hooks/data/useOutsideClick';
import { ISelectedItem } from '../../../types/devices';
import style from './Select.module.scss';

interface ISelectProps {
    items: ISelectedItem[];
    label: string;
    setSelect: (value: ISelectedItem) => void;
}

const Select:FC<ISelectProps> = ({items, label, setSelect}) => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const { isOpen, setIsOpen, modalRef } = useOutsideClick();

    const handleOption = (item:ISelectedItem) => {
      item
      setSelectedOption(item.name);
      setSelect(item);
      setIsOpen(false);
    };

    return (
      <div className={style.select}>
        <div className={style.label}>{label}</div>
        <div
          className={style.header}
          onClick={() => setIsOpen(!isOpen)}
          role="button"
          tabIndex={0}
        >
          <div className={style.placeholder}>
            {selectedOption ? selectedOption : selectFromList}
          </div>
          <span className={style.arrow} />
        </div>
        {isOpen && (
          <div ref={modalRef} className={style.menu}>
            {items.map((item) => (
              <div 
              className={style.item} 
              key={item.id}  
              onClick={() => handleOption(item)}
              >
                {item.name}
              </div>
            ))}
          </div>
        )}
      </div>
    );
};

export default Select;
