import { useUser } from "../../../../hooks/data/useUser";
import { useGetUsersQuery } from "../../../../store/api/userApi";
import UserTable from "./table/UserTable";

const UsersList = () => {
  const { data: users } = useGetUsersQuery();
  const { actions } = useUser()
  return (
    <>
      <UserTable users={users || []} actions={actions} />
    </>
  );
};

export default UsersList;
