import { AppRouteConfig } from '@/app/router/config/types';
import DepartmentPage from '@/pages/admin/department/DepartmentPage';

const DepartmentConfig = {
  title: 'Departments',
  path: '/admin/departments',
  element: <DepartmentPage />,
  requireAuth: true,
  layout: 'default',
} satisfies AppRouteConfig;
export default DepartmentConfig;
