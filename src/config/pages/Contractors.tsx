import { ManageContractor } from '@/features/manage-contractors/ui/ManageContractor';

const ContractorsConfig = {
  title: 'Contractors',
  path: '/admin/contractors',
  element: <ManageContractor />,
  requireAuth: true,
};
export default ContractorsConfig;
