import IssueList from "@/components/pages/issue/IssueList";

const IssueListConfig = {
    title: 'Locations',
    path: '/issue',
    element: <IssueList />,
    requireAuth: true,
}
export default IssueListConfig;