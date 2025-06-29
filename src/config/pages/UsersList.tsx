import UsersList from "@/components/pages/admin/users/UsersList";

const UsersListConfig = {
    title: 'Users',
    path: ['/users', '/admin/users'],
    element: <UsersList />,
    requireAuth: true,
}
export default UsersListConfig;