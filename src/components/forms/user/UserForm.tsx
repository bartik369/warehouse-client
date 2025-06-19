import { memo } from "react";
import Input from "../../ui/input/Input";
import Select from "../../ui/select/Select";
import Toggle from "../../ui/checkbox/Toggle";
import { Entity } from "../../../types/devices";
import Actions from "../device/Actions";
import { useAppSelector } from "../../../hooks/redux/useRedux";
import { RootState } from "../../../store/store";
import {
  no,
  accountIsActive,
  yes,
  addUserTitle,
} from "../../../utils/constants/constants";
import { FieldUserFormConfig } from "../../../types/content";
import { User, UserFormActions } from "../../../types/user";
import styles from "./UserForm.module.scss";

interface UserFormProps {
  actions: UserFormActions;
  departments: Entity[];
  locations: Entity[];
  fields: FieldUserFormConfig[];
}

const UserForm = memo(({
  departments,
  locations,
  fields,
  actions,
}: UserFormProps) => {
  const dataSources = { locations, departments };
  const user = useAppSelector((state:RootState) => state.user.user);
  const errors = useAppSelector((state:RootState) => state.user.errors);
  const checked = useAppSelector((state:RootState) => state.user.checked);

  return (
    <div className={styles.container}>
      <div className={styles.title}>{addUserTitle}</div>
      <form className={styles.form}>
        {fields?.map((field) => {
          if (field.type === "input") {
            return (
              <Input
                key={field.name}
                label={field.label}
                type="text"
                name={field.name}
                value={user[field.name] as keyof User}
                placeholder={field.placeholder}
                errors={errors}
                onChange={(e) =>
                  actions.handleInputChange(field.name, e.target.value)
                }
              />
            );
          }
          if (field.type === "select") {
            const items = dataSources[field.itemsKey!];
            return (
              <Select<Entity>
                key={field.name}
                setValue={(val) => {
                  actions.handleInputChange?.(field.name, val.name);
                  if (field.name === "department") {
                    actions.handleInputChange("departmentId", val.id);
                  }
                  if (field.name === "location") {
                    actions.handleInputChange("locationId", val.id);
                  }
                }}
                items={items || []}
                label={field.label || ""}
                name={field.name}
                value={user[field.name] as keyof User}
                errors={errors}
                getId={(item: Entity) => item.id}
                getLabel={(item) => item.name}
              />
            );
          }
        })}
        <Toggle
          checked={checked}
          setChecked={actions.handleChecked}
          label={accountIsActive}
          leftPosition={no}
          rightPosition={yes}
        />
      </form>
      <div className={styles.actions}>
        <Actions
          resetEntity={actions.handleResetUser}
          addEntity={actions.handleCreateUser}
        />
      </div>
    </div>
  );
});

export default UserForm;
