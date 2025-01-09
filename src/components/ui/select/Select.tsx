import {FC} from 'react';
import {useOutsideClick} from '../../../hooks/data/useOutsideClick';
import { IDevice, ISelectedItem, IValidationDeviceErrors  } from '../../../types/devices';
import { selectFromList, noExistSelect } from '../../../utils/constants/device';
import style from './Select.module.scss';

interface ISelectProps {
    items: ISelectedItem[];
    label: string;
    name?: string;
    value: string;
    errors: IValidationDeviceErrors;
    setValue: (value: ISelectedItem) => void;
}

const Select:FC<ISelectProps> = ({items, name, label, value, setValue, errors}) => {
  const { isOpen, setIsOpen, modalRef } = useOutsideClick();

  const handleSelect = (option: ISelectedItem) => {
    setIsOpen(false);
    setValue(option);
  };

    return (
      <div className={style.wrapper}>
          <div className={style.error}>
          {errors[name as keyof IValidationDeviceErrors]?.length! > 0 && 
      <div>{errors[name as keyof IValidationDeviceErrors]}</div>
      }
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
                    {items.length > 0 
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
