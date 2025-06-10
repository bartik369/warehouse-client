import { memo } from "react";
import { IUserRoleState } from "../../../reducers/roles/userRoleTypes";
import { IUserRoleFormActions } from "../../../types/access";
import { IUser } from "../../../types/user";
import {
  statusLoading,
  statusNoData,
} from "../../../utils/constants/constants";
import styles from "./UserRolesForm.module.scss";

interface IUserSuggestionListProps {
  state: IUserRoleState;
  userState: IUser[];
  actions: IUserRoleFormActions;
  isSuccess: boolean;
  isFetching: boolean;
}

const UserSuggestionList = memo(({
  state,
  userState,
  actions,
  isSuccess,
  isFetching,
}: IUserSuggestionListProps) => {
  let content: React.ReactNode = null;

  if (isFetching) {
    content = <div className={styles.info}>{statusLoading}</div>;
  } else if (!userState.length && isSuccess && state.wasSearched) {
    content = <div className={styles.info}>{statusNoData}</div>;
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
