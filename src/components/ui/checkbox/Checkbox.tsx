import {ChangeEvent, FC, useState} from 'react';
import { useOutsideClick } from '../../../hooks/data/useOutsideClick';
import { Checked } from '../../../types/content';
import { selectFromList } from '../../../utils/constants/device';
import style from './Checkbox.module.scss';

interface ICheckboxProps {
    items: any[];
    label: string;
    name: string;
    onChange:(e: ChangeEvent<HTMLInputElement>, item:any) => void
}
interface IFilterValues {
  id: number;
  name: string;
  value: string;
}


const Checkbox:FC<ICheckboxProps> = ({items, label, name, onChange}) => {
   const {isOpen, setIsOpen, modalRef} = useOutsideClick();
   const [list, setList] = useState<Checked>({});

   const handleCheck = (e: ChangeEvent<HTMLInputElement>, item:IFilterValues) => {
    setList({
      ...list,
      [item.id]: e.target.checked,
    });
    onChange(e, item.value)

   }

    return (
      <div className={style.checkbox}>
        <div className={style.label}>{label}</div>
        <div
          className={style.header}
          onClick={() => setIsOpen(!isOpen)}
          role="button"
        >
          <div className={style.placeholder}>{selectFromList}</div>
          <span className={style.arrow} />
        </div>
        {isOpen && (
          <div ref={modalRef} className={style.menu}>
            {items.map((item) => (
              <label key={item.id} className={style.container}>
                <input
                  name={name}
                  type="checkbox"
                  id={item.id}
                  value={item.name}
                  checked={list[item.id] || false}
                  onChange={(e) => handleCheck(e, item)}
                />
                <span className={style.checkmark}/>
                <label htmlFor={item.id}>
                    {item.name}
                </label>
              </label>
            ))}
          </div>
        )}
      </div>
    );
};

export default Checkbox;