import { IUserRoleState } from "../../../reducers/roles/userRoleTypes";
import {
  IPermissionRoleRes,
  IUserRoleFormActions,
} from "../../../types/access";
import { IUser } from "../../../types/user";
import Input from "../../ui/input/Input";
import Select from "../../ui/select/Select";
import styles from "./UserRolesForm.module.scss";
import UserSuggestionList from "./UserSuggestionList";

interface IUserRolesFormProps {
  roles: IPermissionRoleRes[];
  actions: IUserRoleFormActions;
  state: IUserRoleState;
  userState: IUser[];
  title: string;
}

const UserRolesForm = ({
  roles,
  actions,
  state,
  userState,
  title,
}: IUserRolesFormProps) => {
  console.log(roles);

  return (
    <div>
      <title>{title}</title>
      <div className={styles.group}>
        <Input
          errors={state.errors}
          label="Поиск сотрудника"
          value={state.role.userName}
          type="text"
          name="userName"
          onChange={(e) =>
            actions.handleInputChange("userName", e.target.value)
          }
        />
        <UserSuggestionList userState={userState} />
      </div>
      <Select
        items={roles}
        errors={state.errors}
        name="userRole"
        label="Роль пользователя"
        value={state.role.roleName}
        setValue={(val) => actions.handleInputChange("roleName", val.roleName)}
        getId={(item: IPermissionRoleRes) => item.roleName}
        getLabel={(item: IPermissionRoleRes) => item.roleName}
        getLocation={(item: IPermissionRoleRes) => item.locationName || ""}
        getComment={(item: IPermissionRoleRes) => item.warehouseName}
      />
    </div>
  );
};

export default UserRolesForm;
