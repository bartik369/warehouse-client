import IssueDetailsPage from '@/pages/issue/IssueDetailsPage';

const IssueDetailsConfig = {
  title: 'Выдача',
  path: '/issues/:id',
  element: <IssueDetailsPage />,
  requireAuth: true,
};

export default IssueDetailsConfig;
