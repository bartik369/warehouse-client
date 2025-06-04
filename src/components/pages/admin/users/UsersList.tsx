import { useUser } from "../../../../hooks/data/useUser";
import { useGetUsersQuery } from "../../../../store/api/userApi";
import UserTable from "./table/UserTable";

const UsersList = () => {
  const { data: users } = useGetUsersQuery();
  const { handleGetUser } = useUser()
  return (
    <>
      <UserTable users={users || []} onEditUser={handleGetUser} />
    </>
  );
};

export default UsersList;
