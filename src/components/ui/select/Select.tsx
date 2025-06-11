import { useState } from 'react';
import { useOutsideClick } from '../../../hooks/data/useOutsideClick';
import { IValidationErrors } from '../../../types/devices';
import { selectFromList, noExistSelect } from '../../../utils/constants/device';
import { TbSelector } from "react-icons/tb";
import { MdOutlineErrorOutline } from "react-icons/md";
import styles from './Select.module.scss';

interface ISelectProps<T> {
  items: T[];
  label: string;
  name?: string;
  value: string;
  errors: IValidationErrors;
  setValue: (value: T) => void;
  getId: (item: T) => void;
  getLabel: (item: T) => string;
  getLocation?: (item: T) => string;
  getComment?:(item: T) => string | undefined;
}

const Select = <T,>({
  items,
  name,
  label,
  value,
  errors,
  setValue,
  getId,
  getLabel,
  getLocation,
  getComment
}: ISelectProps<T>) => {
    const { isOpen, setIsOpen, modalRef } = useOutsideClick();
    const errorMessage = errors[name as keyof IValidationErrors];
    
    const handleSelect = (option: T) => {
      setIsOpen(false);
      setValue(option);
    };

    return (
      <div className={styles.wrapper} ref={modalRef}>
        <button
          type="button"
          className={`${styles.container} ${errorMessage ? styles['input-error'] : ''}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {value ? value : selectFromList}
          <TbSelector className={styles.arrow}/>
        </button>
        {label && 
          <span className={styles.label}>
            {label}
          </span>
        }
        {errorMessage && 
            <div className={styles.errorIcon} data-tooltip={errorMessage}>
                <MdOutlineErrorOutline />
            </div>
        }
        {isOpen && (
          <div className={styles.dropdown}>
            {items.length ? (
              items.map((option) => (
                <div
                  key={getId(option)!}
                  className={styles.option}
                  onClick={() => handleSelect(option)}
                  role="button"
                  tabIndex={0}
                >
                <div className={styles.info}>
                <div className={styles.name}>
                  {getLabel(option)}
                </div>
                {getComment?.(option) &&
                 <div className={styles.comment}>{getComment(option)}</div>
                }
                 {getLocation?.(option) &&
                 <div className={styles.comment}>{getLocation(option)}</div>
                }
                </div>
                </div>
              ))
            ) : (
              <div className={styles.noOptions}>{noExistSelect}</div>
            )}
          </div>
        )}
      </div>
    );
  };
export default Select;