import { AppRouteConfig } from '@/app/router/config/types';
import IssueDetailsPage from '@/pages/issue/IssueDetailsPage';

const IssueDetailsConfig = {
  title: 'Выдача',
  path: '/issues/:id',
  element: <IssueDetailsPage />,
  requireAuth: true,
  layout: 'default',
} satisfies AppRouteConfig;

export default IssueDetailsConfig;
