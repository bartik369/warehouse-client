import { useEffect, useRef } from 'react';

import { TbSelector } from 'react-icons/tb';

import { useModal } from '@/hooks/data/useModal';
import { BaseIssueQuery } from '@/types/issue';
import { Warehouse } from '@/types/locations';
import { SELECTS } from '@/utils/constants/ui/selects';

import styles from './Select.module.scss';

interface SelectProps {
  actions: BaseIssueQuery;
  warehouse: Warehouse;
  warehouses: Warehouse[];
}
const Select = ({ warehouse, warehouses, actions }: SelectProps) => {
  const { setIsOpen, isOpen } = useModal(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [setIsOpen]);

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <button type="button" className={`${styles.container}`} onClick={() => setIsOpen(!isOpen)}>
        {warehouse.name || SELECTS.fromList}
        <TbSelector className={styles.arrow} />
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          {warehouses.length ? (
            warehouses.map((option) => (
              <div
                key={option.id}
                className={styles.option}
                onClick={() => {
                  actions.handleSetWarehouse(option);
                  actions.handleFullReset();
                  setIsOpen(false);
                }}
                role="button"
                tabIndex={0}
              >
                <div className={styles.info}>
                  <div className={styles.name}>{option.name}</div>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.noOptions}>{SELECTS.noExist}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Select;
