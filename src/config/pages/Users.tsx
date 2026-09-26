import { ManageUser } from '@/features/manage-user/ui/ManageUser';

const UsersConfig = {
  title: 'Users',
  path: '/admin/users',
  element: <ManageUser />,
  requireAuth: true,
};
export default UsersConfig;
