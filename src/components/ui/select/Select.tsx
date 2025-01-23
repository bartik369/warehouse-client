import {FC} from 'react';
import {useOutsideClick} from '../../../hooks/data/useOutsideClick';
import { IDevice, IEntity, ISelectedItem, IValidationErrors  } from '../../../types/devices';
import { selectFromList, noExistSelect } from '../../../utils/constants/device';
import style from './Select.module.scss';

interface ISelectProps {
    items: IEntity[];
    label: string;
    name?: string;
    value: string;
    errors: IValidationErrors;
    setValue: (value: IEntity) => void;
}

const Select:FC<ISelectProps> = ({items, name, label, value, setValue, errors}) => {
  const { isOpen, setIsOpen, modalRef } = useOutsideClick();
  const errorMessage = errors[name as keyof IValidationErrors];
  const handleSelect = (option:IEntity ) => {
    setIsOpen(false);
    setValue(option);
  };

    return (
      <div className={style.wrapper}>
          <div className={style.error}>
            {errorMessage?.length! > 0 && errorMessage}
          </div>
      <div className={style.selectContainer} ref={modalRef}>
            {label && <label className={style.label}>{label}</label>}
            <input
                name={name}
                type="text"
                className={style.input}
                value={value || ''}
                onClick={() => setIsOpen(!isOpen)}
                placeholder={selectFromList}
                readOnly
            />
            <div className={style.arrow} onClick={() => setIsOpen(!isOpen)} />
            {isOpen && (
                <div className={style.dropdown}>
                    {items
                      ? (items.map((option) => (
                            <div
                                key={option.id}
                                className={style.option}
                                onClick={() => handleSelect(option)}
                                role="button"
                                tabIndex={0}
                            >
                                {option.name}
                            </div>
                        ))
                    ) : (
                        <div className={style['no-options']}>{noExistSelect}</div>
                    )}
                </div>
            )}
        </div>
        </div>
    );
};

export default Select;
