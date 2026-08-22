import { Flex } from 'antd';

import { useIssue } from '@/features/issue-device/model/useIssue';
import { IssueProcessesTable } from '@/widgets/issue-processes-table/ui/IssueProcessesTable';

import { useIssueList } from '../model/useIssueList';
import { HeaderIssues } from './header/HeaderIssues';

export const IssueList = () => {
  const { page, limit, selectedRowKeys, issueProcesses, isLoading, selectedIssue, onSelect } =
    useIssueList();
  const { actions } = useIssue();

  return (
    <Flex vertical gap={20} justify="center">
      <HeaderIssues
        selectedIssue={selectedIssue}
        onStart={actions.handleStartNewIssue}
        onDelete={actions.handleDeleteIssueProcess}
      />
      <IssueProcessesTable
        loading={isLoading}
        page={page}
        limit={limit}
        selectedRowKeys={selectedRowKeys}
        issueProcesses={issueProcesses}
        onSelect={onSelect}
      />
    </Flex>
  );
};
