import AccessPage from '@/pages/admin/access/AccessPage';

const AccessConfig = {
  title: 'Grant access',
  path: '/admin/access',
  element: <AccessPage />,
  requireAuth: true,
};
export default AccessConfig;
