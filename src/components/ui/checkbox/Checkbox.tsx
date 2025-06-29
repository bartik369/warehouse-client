import { useOutsideClick } from "@/hooks/data/useOutsideClick";
import { Checked, CheckedPermissionOptions } from "@/types/content";
import { AccessFormActions, PermissionRole } from "@/types/access";
import { TbSelector } from "react-icons/tb";
import { MESSAGES } from "@/utils/constants/ui/messages";
import { LABELS } from "@/utils/constants/ui/labels";
import styles from "./Checkbox.module.scss";

interface CheckboxProps {
  list: Checked;
  entity: PermissionRole;
  items: CheckedPermissionOptions[];
  actions: AccessFormActions;
  label: string;
  name: string;
  errors: Record<string, string>;
}

const Checkbox = ({
  list,
  entity,
  items,
  actions,
  label,
  name,
  errors,
}: CheckboxProps) => {
  const { isOpen, setIsOpen, modalRef } = useOutsideClick();
  const errorMessage = errors[name];
  const FIXED_PERMISSIONS = ['user.create', 'user.edit', 'device.create', 'device.edit'];

  return (
    <div className={styles.wrapper}>
      <button
        className={styles.checkbox}
        onClick={() => { setIsOpen(!isOpen) }}
        type="button"
      >
        <span className={styles.label}>{label}</span>
        <span>{LABELS.selectPermissions}</span>
        {entity.permissionsName?.length > 0 && (
          <span className={styles.count}>{entity.permissionsName.length}</span>
        )}
         <TbSelector className={styles.arrow}/>
      </button>
      {errorMessage && <div className={styles.error}>{errorMessage}</div>}
      {isOpen && (
        <div ref={modalRef} className={styles.checkboxMenu}>
          {items.length > 0 ? (
            items.filter((item) => !FIXED_PERMISSIONS.includes(item.name))
            .map((item) => (
              <label key={item.id} className={styles.container}>
                <input
                  name={name}
                  type="checkbox"
                  id={item.id}
                  value={item.name}
                  checked={list[item.id] || false}
                  disabled={item.disabled}
                  onChange={(e) => actions.handleCheck(e, item, name)}
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
            <div className={styles.info}>{MESSAGES.noOptions}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Checkbox;
