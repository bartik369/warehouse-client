import AddUser from "@/components/pages/admin/users/AddUser";

const AddUserConfig = {
    title: 'AddUser',
    path: '/admin/add-user',
    element: <AddUser/>,
    requireAuth: true,
}
export default AddUserConfig;