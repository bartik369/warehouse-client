import { memo } from "react";
import { UserRoleState } from "../../../reducers/roles/userRoleTypes";
import { UserRoleFormActions } from "../../../types/access";
import { User } from "../../../types/user";
import { MESSAGES } from "../../../utils/constants/ui/messages";
import styles from "./UserRolesForm.module.scss";

interface UserSuggestionListProps {
  state: UserRoleState;
  userState: User[];
  actions: UserRoleFormActions;
  isSuccess: boolean;
  isFetching: boolean;
}

const UserSuggestionList = memo(({
  state,
  userState,
  actions,
  isSuccess,
  isFetching,
}: UserSuggestionListProps) => {
  let content: React.ReactNode = null;

  if (isFetching) {
    content = <div className={styles.info}>{MESSAGES.loading}</div>;
  } else if (!userState.length && isSuccess && state.wasSearched) {
    content = <div className={styles.info}>{MESSAGES.noData}</div>;
  } else if (!userState.length) {
    return null;
  } else {
    content = userState.map((item) => (
      <div
        className={styles.list}
        key={item.id}
        onClick={() => actions.handleUserInfo(item)}
      >
        <span className={styles.name}>
          {item.firstNameRu} {item.lastNameRu}
        </span>
        <span className={styles.email}>{item.email}</span>
      </div>
    ));
  }
  return <div className={styles.userList}>{content}</div>;
});

export default UserSuggestionList;
