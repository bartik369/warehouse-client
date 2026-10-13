import { AppRouteConfig } from '@/app/router/config/types';
import IssuesPage from '@/pages/issue/IssuesPage';

const IssueListConfig = {
  title: 'Issues',
  path: '/issues',
  element: <IssuesPage />,
  requireAuth: true,
  layout: 'wide',
} satisfies AppRouteConfig;
export default IssueListConfig;
