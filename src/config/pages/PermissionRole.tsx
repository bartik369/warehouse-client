import PermissionRole from "@/components/pages/admin/permission/PermissionRole";

const PermissionRoleConfig = {
    title: 'Profile',
    path: '/admin/add-permission_role',
    element: <PermissionRole/>,
    requireAuth: true,
}
export default PermissionRoleConfig;