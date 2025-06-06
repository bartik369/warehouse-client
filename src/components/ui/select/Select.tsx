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
  getComment
}: ISelectProps<T>) => {
    const { isOpen, setIsOpen, modalRef } = useOutsideClick();
    const errorMessage = errors[name as keyof IValidationErrors];
    
    const handleSelect = (option: T) => {
      setIsOpen(false);
      setValue(option);
    };

    const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

    const handleKeyDown = (e: React.KeyboardEvent) => {
      e.preventDefault()
      if (!isOpen) return;
      if (e.key === 'ArrowDown') {
        setFocusedIndex((prev) =>
          prev === null || prev >= items.length - 1 ? 0 : prev + 1
        );
      } else if (e.key === 'ArrowUp') {
        setFocusedIndex((prev) =>
          prev === null || prev <= 0 ? items.length - 1 : prev - 1
        );
      } else if (e.key === 'Enter' && focusedIndex !== null) {
        handleSelect(items[focusedIndex]);
      } else if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    return (
      <div className={styles.wrapper} onKeyDown={handleKeyDown} ref={modalRef}>
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
            <div className={styles['error-icon']} data-tooltip={errorMessage}>
                <MdOutlineErrorOutline />
            </div>
        }
        {isOpen && (
          <div className={styles.dropdown}>
            {items.length ? (
              items.map((option, index) => (
                <div
                  key={getId(option)!}
                  className={`${styles.option} ${
                    focusedIndex === index ? styles.focused : ""
                  }`}
                  onClick={() => handleSelect(option)}
                  role="button"
                  tabIndex={0}
                  onFocus={() => setFocusedIndex(index)}
                  onBlur={() => setFocusedIndex(null)}
                >
                <div className={styles.info}>
                <div className={styles.name}>{getLabel(option)}</div>
                {getComment?.(option) &&
                 <div className={styles.comment}>{getComment(option)}</div>
                }
                </div>
                </div>
              ))
            ) : (
              <div className={styles["no-options"]}>{noExistSelect}</div>
            )}
          </div>
        )}
      </div>
    );
  };
export default Select;