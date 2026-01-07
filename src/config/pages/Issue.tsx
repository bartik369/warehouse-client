import Issue from '@/components/pages/issue/Issue';

const IssueWrapper = () => {
  return <Issue />;
};

const IssueConfig = {
  title: 'Issue',
  path: '/issue/create-issue',
  element: <IssueWrapper />,
  requireAuth: true,
};

export default IssueConfig;
