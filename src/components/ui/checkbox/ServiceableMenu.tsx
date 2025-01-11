import React, {ChangeEvent, FC} from 'react';
import { useOutsideClick } from '../../../hooks/data/useOutsideClick';
import style from './Checkbox.module.scss';

interface ICheckboxProps {
    label: string;
    name: string;
    value:boolean[];
    items: {id: number; name: string; value:boolean}[]
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ServiceableMenu:FC<ICheckboxProps> = ({items, label, name, value, onChange}) => {
    const {isOpen, setIsOpen, modalRef} = useOutsideClick();
    return (
        <div className={style.dropdown} ref={modalRef}>
          <div className={style.label}>{label}</div>
          <div
            className={style.dropdownHeader}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <div className={style.placeholder}>
              {value.length === 0
                ? "Выберите состояние"
                : value
                    .map((val) => items.find((item) => item.value === val)?.name)
                    .filter(Boolean)
                    .join(", ")}
            </div>
            <span className={style.arrow} />
          </div>
          {isOpen && (
            <div className={style.dropdownMenu}>
              {items.map((item) => (
                <label key={item.id} className={style.dropdownItem}>
                  <input
                    type="checkbox"
                    name={name}
                    value={String(item.value)}
                    checked={value.includes(item.value)}
                    onChange={onChange}
                    className={style.checkbox}
                  />
                  {item.name}
                </label>
              ))}
            </div>
          )}
        </div>
      );
};

export default ServiceableMenu;