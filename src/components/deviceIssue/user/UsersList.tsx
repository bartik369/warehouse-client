import { memo } from "react"
import { BaseUserQuery, User } from "../../../types/user";
import { useAppSelector } from "../../../hooks/redux/useRedux";
import { RootState } from "../../../store/store";
import { statusLoading, statusNoData } from "../../../utils/constants/constants";
import { IssueState } from "../../../features/issue/model/issueTypes";
import styles from "./UsersList.module.scss";

interface UsersListProps {
  state: IssueState;
  actions: BaseUserQuery;
  isSuccess: boolean;
  isFetching: boolean;
}

const UsersList = memo(({
  state,
  actions,
  isSuccess,
  isFetching
}: UsersListProps) => {
  const users = useAppSelector((state: RootState) => state.user.users);
  let content: React.ReactNode = null;
  if (isFetching) {
    content = <div className={styles.info}>{statusLoading}</div>;
  } else if (!users.length && isSuccess && state.wasSearched) {
    content = <div className={styles.info}>{statusNoData}</div>;
  } else if (!users.length) {
    return null;
  } else {
    content = users.map((item: User) => (
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
