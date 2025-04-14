import AddUser from "../../components/pages/admin/user/AddUser";

const AddUserConfig = {
    title: 'AddUser',
    path: '/admin/add-user',
    element: <AddUser/>,
    requireAuth: true,
}
export default AddUserConfig;