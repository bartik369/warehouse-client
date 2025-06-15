import { memo } from "react";
import { IDeviceIssueState } from "./context/deviceIssueTypes";
import { IBaseUserQuery } from "../../types/user";
import { statusLoading, statusNoData } from "../../utils/constants/constants";
import styles from "./UsersList.module.scss";

interface IUsersListProps {
  state: IDeviceIssueState;
  actions: IBaseUserQuery;
  isSuccess: boolean;
  isFetching: boolean;
}

const UsersList = memo(({
  state,
  actions,
  isSuccess,
  isFetching
}: IUsersListProps) => {
  let content: React.ReactNode = null;
  if (isFetching) {
    content = <div className={styles.info}>{statusLoading}</div>;
  } else if (!state.users.length && isSuccess && state.wasSearched) {
    content = <div className={styles.info}>{statusNoData}</div>;
  } else if (!state.users.length) {
    return null;
  } else {
    content = state.users.map((item) => (
      <div
        className={styles.list}
        key={item.id}
        onClick={() => actions.handleSetUser(item.id)}
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

export default UsersList;
