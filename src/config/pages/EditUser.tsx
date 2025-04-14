import EditUser from "../../components/pages/admin/user/EditUser";

const EditUserConfig = {
    title: 'EditUser',
    path: '/admin/edit-user',
    element: <EditUser/>,
    requireAuth: true,
}
export default EditUserConfig;