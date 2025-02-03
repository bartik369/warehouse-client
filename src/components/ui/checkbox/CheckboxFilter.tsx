import {ChangeEvent, FC, useState} from 'react';
import { useOutsideClick } from '../../../hooks/data/useOutsideClick';
import { Checked, CheckedDeviceOptions } from '../../../types/content';
import { selectFromList } from '../../../utils/constants/device';
import filterIcon from '../../../assets/elements/filter-icon.svg'
import style from './CheckboxFilter.module.scss';

interface ICheckboxProps {
    items: CheckedDeviceOptions[];
    label: string;
    name: string;
    onChange:(e: ChangeEvent<HTMLInputElement>, item:string) => void
}

const CheckboxFilter:FC<ICheckboxProps> = ({items, label, name, onChange}) => {
   const {isOpen, setIsOpen, modalRef} = useOutsideClick();
   const [list, setList] = useState<Checked>({});

   const handleCheck = (e: ChangeEvent<HTMLInputElement>, item: CheckedDeviceOptions) => {
    setList((prev) => ({
      ...prev,
      [item.id]: e.target.checked,
    }));
    onChange(e, item.value);
  };

    return (
      <div className={style.checkbox}>
        <div className={style.header} onClick={() => setIsOpen(!isOpen)} role="button">
          <div className={style.placeholder}>{label}</div>
          <img src={filterIcon} alt="" />
        </div>
        {isOpen && (
          <div ref={modalRef} className={style.menu}>
            {items.map((item) => (
              <label key={item.id} className={style.container}>
                <input
                  name={name}
                  type="checkbox"
                  id={String(item.id)}
                  value={item.name}
                  checked={list[item.id] || false}
                  onChange={(e) => handleCheck(e, item)}
                />
                <span className={style.checkmark}/>
                <label htmlFor={String(item.id)}>
                    {item.name}
                </label>
              </label>
            ))}
          </div>
        )}
      </div>
    );
};

export default CheckboxFilter;