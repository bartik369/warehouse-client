import { createUserFields } from '@/features/create-user/model/createUserFields';
import { CreateUserForm } from '@/features/create-user/ui/CreateUserForm';
import { useUser } from '@/hooks/data/useUser';
import { useGetDepartmentsQuery } from '@/store/api/departmentApi';
import { useGetLocationsQuery } from '@/store/api/locationApi';

const AddUser = () => {
  const { data: locations } = useGetLocationsQuery();
  const { data: departments } = useGetDepartmentsQuery();
  const { actions } = useUser();
  return (
    <section>
      <CreateUserForm
        actions={actions}
        fields={createUserFields}
        locations={locations || []}
        departments={departments || []}
      />
    </section>
  );
};

export default AddUser;
