import IssueProcessPage from '@/pages/issue/IssueProcessPage';

const IssueConfig = {
  title: 'Issue create',
  path: '/issues/new',
  element: <IssueProcessPage />,
  requireAuth: true,
};

export default IssueConfig;
