import { AppRouteConfig } from '@/app/router/config/types';
import IssueProcessPage from '@/pages/issue/IssueProcessPage';

const IssueConfig = {
  title: 'Issue create',
  path: '/issues/new',
  element: <IssueProcessPage />,
  requireAuth: true,
  layout: 'default',
} satisfies AppRouteConfig;

export default IssueConfig;
