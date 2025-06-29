import UserTableRow from "./UserTableRow";
import { LABELS } from '@/utils/constants/ui/labels';
import { User, UserFormActions, UserLabel } from '@/types/user'
import styles from './UserTable.module.scss';

interface UserTableProps {
    users: User[];
    actions: UserFormActions;
}

const UserTable = ({ users, actions }: UserTableProps) => {
  const isAdmin = true;

  const baseUserLabelsConfig: UserLabel[] = [
    { key: "firstNameRu", label: LABELS.firstNameRu },
    { key: "lastNameRu", label: LABELS.lastNameRu },
    { key: "firstNameEn", label: LABELS.firstNameEn },
    { key: "lastNameEn", label: LABELS.lastNameEn },
    { key: "email", label: LABELS.email },
    { key: "location", label: LABELS.location },
    { key: "department", label: LABELS.department },
    { key: "workId", label: LABELS.workID },
    { key: "isActive", label: LABELS.isActive },
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
