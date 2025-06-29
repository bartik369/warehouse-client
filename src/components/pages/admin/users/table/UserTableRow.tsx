import { User, UserFormActions } from "@/types/user";
import { MdOutlineModeEdit } from "react-icons/md";
import { GoCheckCircleFill } from "react-icons/go";
import { IoCloseCircle } from "react-icons/io5";
import styles from "./UserTableRow.module.scss";

interface UserTableRowProps {
  user: User;
  isAdmin: boolean;
  actions:UserFormActions;
}

const UserTableRow = ({ user, isAdmin, actions }: UserTableRowProps) => {
  return (
    <tr className={styles.row}>
      <td>{user.firstNameRu}</td>
      <td>{user.lastNameRu}</td>
      <td>{user.firstNameEn}</td>
      <td>{user.lastNameEn}</td>
      <td>{user.email}</td>
      <td>{user.location}</td>
      <td>{user.department}</td>
      <td>{user.workId}</td>
      <td className={`${styles.status} ${user.isActive ? styles.active : ""}`}>
        {user.isActive ? (
          <GoCheckCircleFill />
        ) : (
          <IoCloseCircle />
        )}
      </td>
      {isAdmin && (
        <td>
          <MdOutlineModeEdit className={styles.icon} onClick={() =>actions.handleGetUser(user.id)} />
        </td>
      )}
    </tr>
  );
};

export default UserTableRow;
