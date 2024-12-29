import {FC, useState} from 'react';
import { useOutsideClick } from '../../../hooks/data/useOutsideClick';
import style from './Checkbox.module.scss';

interface ICheckboxProps {
    items: any[]
}
type Checked = {
    [index: number]: boolean;
}
const Checkbox:FC<ICheckboxProps> = ({items}) => {
   const {isOpen, setIsOpen, modalRef} = useOutsideClick();
   const [list, setList] = useState<Checked>({});

    return (
      <div className={style.checkbox}>
        <div className={style.label}>Производитель</div>
        <div
          className={style.header}
          onClick={() => setIsOpen(!isOpen)}
          role="button"
        >
          <div className={style.placeholder}>Category</div>
          <span className={style.arrow} />
        </div>
        {isOpen && (
          <div ref={modalRef} className={style.menu}>
            {items.map((item) => (
              <label key={item.id} className={style.container}>
                <input
                  type="checkbox"
                  id={item.id}
                  value={item.name}
                  checked={list[item.id]}
                  onChange={(e) =>
                    setList({
                      ...list,
                      [item.id]: e.target.checked,
                    })
                  }
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