import { ChangeEvent, FC } from "react";
import { useOutsideClick } from "../../../hooks/data/useOutsideClick";
import { Checked, CheckedDeviceOptions } from "../../../types/content";
import { noOptions } from "../../../utils/constants/constants";
import styles from "./CheckboxFilter.module.scss";
import { IPermissionRole } from "../../../types/access";

interface ICheckboxProps {
  entity: IPermissionRole;
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

const Checkbox: FC<ICheckboxProps> = ({
  entity,
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
      <button
        className={styles.checkbox}
        onClick={(e) => {
          setIsOpen(!isOpen);
          e.preventDefault();
        }}
      >
        <span className={styles.label}>{label}</span>
        <span>Выбрать роли</span>
        {entity.permissionName.length > 0 && (
          <span className={styles.count}>{entity.permissionName.length}</span>
        )}
        <span className={styles.arrow} />
      </button>
      {isOpen && (
        <div ref={modalRef} className={styles.menu2}>
          {items.length ? (
            items.map((item) => (
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
                  role={"checkbox"}
                  aria-checked={list[item.id] || false}
                  className={styles.checkmark}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      e.currentTarget.click();
                    }
                  }}
                />
                <span className={styles.title}>{item.name}</span>
              </label>
            ))
          ) : (
            <div className={styles.info}>{noOptions}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Checkbox;
