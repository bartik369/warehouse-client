import { memo } from "react";
import { UserRoleState } from "../../../reducers/roles/userRoleTypes";
import { User } from "../../../types/user";
import {
  placeholderUserSearch,
  userRoleLabel,
  userSearchLabel,
} from "../../../utils/constants/constants";
import Input from "../../ui/input/Input";
import Select from "../../ui/select/Select";
import UserSuggestionList from "./UserSuggestionList";
import { ListRoleRes, UserRoleFormActions } from "../../../types/access";
import styles from "./UserRolesForm.module.scss";
import Actions from "../device/Actions";

interface UserRolesFormProps {
  roles: ListRoleRes[];
  actions: UserRoleFormActions;
  state: UserRoleState;
  userState: User[];
  title: string;
  isFetching: boolean;
  isSuccess: boolean;
}

const UserRolesForm = memo(
  ({ roles, actions, state, userState, title, isFetching, isSuccess }: UserRolesFormProps) => {
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
          getId={(item: ListRoleRes) => item.roleName}
          getLabel={(item: ListRoleRes) => item.roleName}
          getLocation={(item: ListRoleRes) => item.locationName || ""}
          getComment={(item: ListRoleRes) => item.warehouseName}
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
