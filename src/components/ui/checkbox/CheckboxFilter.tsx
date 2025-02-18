import { ChangeEvent, FC, useEffect, useRef } from "react";
import { useOutsideClick } from "../../../hooks/data/useOutsideClick";
import { Checked, CheckedDeviceOptions } from "../../../types/content";
import { LuListFilter } from "react-icons/lu";

import styles from "./CheckboxFilter.module.scss";

interface ICheckboxProps {
  items: CheckedDeviceOptions[];
  label: string;
  name: string;
  list: Checked;
  setList: (list: Checked | ((prev: Checked) => Checked)) => void;
  onChange: (
    e: ChangeEvent<HTMLInputElement>,
    item: CheckedDeviceOptions
  ) => void;
}

const CheckboxFilter: FC<ICheckboxProps> = ({
  items,
  label,
  name,
  list,
  setList,
  onChange,
}) => {
  const { isOpen, setIsOpen, modalRef } = useOutsideClick();

  const handleCheck = (
    e: ChangeEvent<HTMLInputElement>,
    item: CheckedDeviceOptions
  ) => {
    setList((prev) => ({
      ...prev,
      [item.id]: e.target.checked,
    }));
    onChange(e, item);
  };

  return (
    <div className={styles.wrapper}>
      <button className={styles.checkbox} onClick={() => setIsOpen(!isOpen)}>
        <div className={styles.header}>
          <div className={styles.placeholder}>{label}</div>
          <LuListFilter className={styles.icon} />
        </div>
      </button>
      {isOpen && (
        <div ref={modalRef} className={styles.menu}>
          {items.map((item) => (
            <label key={item.id} className={styles.container}>
              <input
                name={name}
                type="checkbox"
                id={String(item.id)}
                value={item.name}
                checked={list[item.id] || false}
                disabled={item.disabled}
                onChange={(e) => handleCheck(e, item)}
              />
              <span
                role={'checkbox'}
                aria-checked={list[item.id] || false}
                className={styles.checkmark}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault(); // disable scroll
                    e.currentTarget.click();
                  }
                }}
              />
              <span className={styles.title}>{item.name}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default CheckboxFilter;
