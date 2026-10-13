import { AppRouteConfig } from '@/app/router/config/types';
import ContractorsPage from '@/pages/admin/contractor/ContractorsPage';

const ContractorsConfig = {
  title: 'Contractors',
  path: '/admin/contractors',
  element: <ContractorsPage />,
  requireAuth: true,
  layout: 'default',
} satisfies AppRouteConfig;
export default ContractorsConfig;
