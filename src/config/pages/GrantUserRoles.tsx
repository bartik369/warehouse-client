import GrantUserRoles from "@/components/pages/admin/roles/GrantUserRoles";

const GrantUserRolesConfig = {
    title: 'Grant access',
    path:'/admin/grant-access',
    element: <GrantUserRoles />,
    requireAuth: true,
}
export default GrantUserRolesConfig;