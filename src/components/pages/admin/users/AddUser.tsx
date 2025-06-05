import UserForm from "../../../forms/user/UserForm";
import { createFormFields } from "../../../forms/user/formConfigs/userFormConfigs";
import { useGetDepartmentsQuery } from "../../../../store/api/departmentApi";
import { useGetLocationsQuery } from "../../../../store/api/locationApi";
import { useUser } from "../../../../hooks/data/useUser";

const AddUser = () => {
  const { data: locations } = useGetLocationsQuery();
  const { data: departments } = useGetDepartmentsQuery();
  const  {state, actions } = useUser();
  return (
    <div>
      <UserForm
        state={state}
        actions={actions}
        fields={createFormFields}
        locations={locations || []}
        departments={departments || []}
      />
    </div>
  );
};

export default AddUser;
