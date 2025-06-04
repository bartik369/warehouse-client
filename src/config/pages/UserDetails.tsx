import UserDetails from "../../components/pages/admin/users/UserDetails";

const UserDetailsConfig = {
    title: 'Users',
    path: ['/users/:id', '/admin/users/:id'],
    element: <UserDetails />,
    requireAuth: true,
}
export default UserDetailsConfig;