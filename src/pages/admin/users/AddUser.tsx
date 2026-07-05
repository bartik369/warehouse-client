import UserForm from '@/components/forms/user/UserForm';
import { createFormFields } from '@/components/forms/user/formConfigs/userFormConfigs';
import { useUser } from '@/hooks/data/useUser';
import { useGetDepartmentsQuery } from '@/store/api/departmentApi';
import { useGetLocationsQuery } from '@/store/api/locationApi';

const AddUser = () => {
  const { data: locations } = useGetLocationsQuery();
  const { data: departments } = useGetDepartmentsQuery();
  const { actions } = useUser();
  return (
    <section>
      <UserForm
        actions={actions}
        fields={createFormFields}
        locations={locations || []}
        departments={departments || []}
      />
    </section>
  );
};

export default AddUser;
