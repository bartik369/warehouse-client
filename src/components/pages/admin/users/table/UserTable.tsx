import { IUser, IUserFormActions, UserLabel } from '../../../../../types/user'
import UserTableRow from "./UserTableRow";
import styles from './UserTable.module.scss';
import { labelCity, labelDepartment, labelEmail, labelFirstNameEn, 
  labelFirstNameRu, labelIsActive, labelLastNameEn, labelLastNameRu, 
labelUserId } from '../../../../../utils/constants/user';

interface IUserTableProps {
    users: IUser[];
    actions: IUserFormActions;
}

const UserTable = ({ users, actions }: IUserTableProps) => {
  const isAdmin = true;

  const baseUserLabelsConfig: UserLabel[] = [
    { key: "firstNameRu", label: labelFirstNameRu },
    { key: "lastNameRu", label: labelLastNameRu },
    { key: "firstNameEn", label: labelFirstNameEn },
    { key: "lastNameEn", label: labelLastNameEn },
    { key: "email", label: labelEmail },
    { key: "location", label: labelCity },
    { key: "department", label: labelDepartment },
    { key: "workId", label: labelUserId },
    { key: "isActive", label: labelIsActive },
  ];
  
  const userLabelsConfig: UserLabel[] = isAdmin
  ? [...baseUserLabelsConfig, { key: "actions", label: "" }]
  : baseUserLabelsConfig

  return (
    <table className={styles.table}>
        <thead>
            <tr>
                {userLabelsConfig?.map((item) => (
                    <th key={item.key}>{item.label}</th>
                ))}
            </tr>
        </thead>
        <tbody>
            {users?.map((user) => (
                <UserTableRow 
                  key={user.id} 
                  user={user} 
                  isAdmin={isAdmin}
                  actions={actions}
                />
            ))}
        </tbody>
    </table>
  )
};

export default UserTable;
