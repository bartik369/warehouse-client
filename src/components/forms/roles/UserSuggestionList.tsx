import { IUser } from "../../../types/user";
import styles from "./UserRolesForm.module.scss";

interface IUserSuggestionListProps {
  userState: IUser[];
}

const UserSuggestionList = ({ userState }: IUserSuggestionListProps) => {
  if (!userState.length) return null;

  return (
    <div className={styles.userList}>
      {userState.map((item) => (
        <div className={styles.list} key={item.id}>
          <span>{item.firstNameRu}</span>
          <span>{item.lastNameRu}</span>
          <span>{item.email}</span>
        </div>
      ))}
    </div>
  );
};

export default UserSuggestionList;
