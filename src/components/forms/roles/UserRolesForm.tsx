import { memo } from "react";
import { IUserRoleState } from "../../../reducers/roles/userRoleTypes";
import { IUser } from "../../../types/user";
import {
  placeholderUserSearch,
  userRoleLabel,
  userSearchLabel,
} from "../../../utils/constants/constants";
import Input from "../../ui/input/Input";
import Select from "../../ui/select/Select";
import UserSuggestionList from "./UserSuggestionList";
import { IListRoleRes, IUserRoleFormActions } from "../../../types/access";
import styles from "./UserRolesForm.module.scss";
import Actions from "../device/Actions";

interface IUserRolesFormProps {
  roles: IListRoleRes[];
  actions: IUserRoleFormActions;
  state: IUserRoleState;
  userState: IUser[];
  title: string;
  isFetching: boolean;
  isSuccess: boolean;
}

const UserRolesForm = memo(
  ({ roles, actions, state, userState, title, isFetching, isSuccess }: IUserRolesFormProps) => {
    return (
      <>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.group}>
          <Input
            errors={state.errors}
            placeholder={placeholderUserSearch}
            label={userSearchLabel}
            value={state.role.email}
            type="text"
            name="email"
            onChange={(e) => actions.handleInputChange("email", e.target.value)}
          />
          {state.isUsersListVisible && (
            <UserSuggestionList 
            state={state}
            userState={userState} 
            actions={actions}
            isSuccess={isSuccess}
            isFetching={isFetching}
            />
          )}
        </div>
        <Select
          items={roles}
          errors={state.errors}
          name="roleName"
          label={userRoleLabel}
          value={state.role.roleName}
          setValue={(val) => {
            actions.handleInputChange("roleName", val.roleName);
            actions.handleInputChange("roleId", val.roleId);
          }}
          getId={(item: IListRoleRes) => item.roleName}
          getLabel={(item: IListRoleRes) => item.roleName}
          getLocation={(item: IListRoleRes) => item.locationName || ""}
          getComment={(item: IListRoleRes) => item.warehouseName}
        />
        <div className={styles.actions}>
          <Actions
          addEntity={actions.handleAddUserRole}
          resetEntity={actions.handleResetUserRole}
          />
        </div>
      </>
    );
  }
);

export default UserRolesForm;
