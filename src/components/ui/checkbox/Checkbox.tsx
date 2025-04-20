import { FC } from 'react';
import { useOutsideClick } from "../../../hooks/data/useOutsideClick";
import { Checked, CheckedPermissionOptions } from "../../../types/content";
import { noOptions, selectPermissions } from "../../../utils/constants/constants";
import { IPermissionState } from "../../../reducers/permission/permissionTypes";
import { IAccessFormActions, IPermissionRole } from "../../../types/access";
import styles from "./Checkbox.module.scss";

interface ICheckboxProps {
  state: IPermissionState;
  list: Checked;
  entity: IPermissionRole;
  items: CheckedPermissionOptions[];
  actions: IAccessFormActions;
  label: string;
  name: string;
}

const Checkbox: FC<ICheckboxProps> = ({
  list,
  entity,
  actions,
  items,
  label,
  name,
}) => {
  const { isOpen, setIsOpen, modalRef } = useOutsideClick();
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
        <span>{selectPermissions}</span>
        {entity.permissionName.length > 0 && (
          <span className={styles.count}>{entity.permissionName.length}</span>
        )}
        <span className={styles.arrow} />
      </button>
      {isOpen && (
        <div ref={modalRef} className={styles['checkbox-menu']}>
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
                  onChange={(e) => actions.handleCheck(e, item)}
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
