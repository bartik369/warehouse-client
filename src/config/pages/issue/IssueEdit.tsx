import { AppRouteConfig } from '@/app/router/config/types';
import IssueProcessPage from '@/pages/issue/IssueProcessPage';

const IssueEditConfig = {
  title: 'Продолжение выдачи',
  path: '/issues/:id/edit',
  element: <IssueProcessPage />,
  requireAuth: true,
  layout: 'default',
} satisfies AppRouteConfig;

export default IssueEditConfig;
