import { useUser } from "../../../../hooks/data/useUser";
import { useGetUsersQuery } from "../../../../store/api/userApi";
import UserTable from "./table/UserTable";

const UsersList = () => {
  const { data: users } = useGetUsersQuery();
  const { actions } = useUser()
  return (
    <section>
      <UserTable users={users || []} actions={actions} />
    </section>
  );
};

export default UsersList;
