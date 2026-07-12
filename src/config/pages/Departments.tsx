import DepartmentPage from '@/pages/admin/department/DepartmentPage';

const DepartmentConfig = {
  title: 'Departments',
  path: '/admin/departments',
  element: <DepartmentPage />,
  requireAuth: true,
};
export default DepartmentConfig;
