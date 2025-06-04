import UserForm from "../../../forms/user/UserForm";
import { createFormFields } from "../../../forms/user/formConfigs/userFormConfigs";
import { useGetDepartmentsQuery } from "../../../../store/api/departmentApi";
import { useGetLocationsQuery } from "../../../../store/api/locationApi";

const AddUser = () => {
  const { data: locations } = useGetLocationsQuery();
  const { data: departments } = useGetDepartmentsQuery();
  return (
    <div>
      <UserForm
        fields={createFormFields}
        locations={locations || []}
        departments={departments || []}
      />
    </div>
  );
};

export default AddUser;
