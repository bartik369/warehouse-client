import AddPermission from "@/components/pages/admin/permission/AddPermission";

const AddPermissionConfig = {
    title: 'AddPermission',
    path: '/admin/add-permission',
    element: <AddPermission />,
    requireAuth: true,
}
export default AddPermissionConfig;