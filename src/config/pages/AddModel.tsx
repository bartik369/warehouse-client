import { AppRouteConfig } from '@/app/router/config/types';
import ModelPage from '@/pages/admin/model/ModelPage';

const AddModelConfig = {
  title: 'AddModel',
  path: '/admin/add-model',
  element: <ModelPage />,
  requireAuth: true,
  layout: 'default',
} satisfies AppRouteConfig;
export default AddModelConfig;
