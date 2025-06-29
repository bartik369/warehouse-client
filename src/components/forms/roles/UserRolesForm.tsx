import { memo } from "react";
import Actions from "../device/Actions";
import UserSuggestionList from "./UserSuggestionList";
import { useAppSelector } from "@/hooks/redux/useRedux";
import { UserRoleState } from "@/reducers/roles/userRoleTypes";
import Input from "@/components/ui/input/Input";
import Select from "@/components/ui/select/Select";
import { RootState } from "@/store/store";
import { ListRoleRes, UserRoleFormActions } from "@/types/access";
import { PLACEHOLDER_LABELS } from "@/utils/constants/ui/placeholders";
import { LABELS } from "@/utils/constants/ui/labels";
import styles from "./UserRolesForm.module.scss";

interface UserRolesFormProps {
  roles: ListRoleRes[];
  actions: UserRoleFormActions;
  state: UserRoleState;
  title: string;
  isFetching: boolean;
  isSuccess: boolean;
}

const UserRolesForm = memo(
  ({ roles, actions, state, title, isFetching, isSuccess }: UserRolesFormProps) => {
    const users = useAppSelector((state:RootState) => state.user.users);
    return (
      <>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.group}>
          <Input
            errors={state.errors}
            placeholder={PLACEHOLDER_LABELS.userSearch}
            label={LABELS.userSearch}
            value={state.role.email}
            type="text"
            name="email"
            onChange={(e) => actions.handleInputChange("email", e.target.value)}
          />
          {state.isUsersListVisible && (
            <UserSuggestionList 
            state={state}
            userState={users} 
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
          label={LABELS.userRole}
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
