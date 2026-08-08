import IssueProcessPage from '@/pages/issue/IssueProcessPage';

const IssueEditConfig = {
  title: 'Продолжение выдачи',
  path: '/issues/:id/edit',
  element: <IssueProcessPage />,
  requireAuth: true,
};

export default IssueEditConfig;
