import UserForm from '../../../forms/user/UserForm';
import { useGetDepartmentsQuery } from '../../../../store/api/departmentApi';

const AddUser = () => {
    const { data:departments } = useGetDepartmentsQuery();
    return (
        <div>
            <UserForm departments={departments || []} />   
        </div>
    );
};

export default AddUser;