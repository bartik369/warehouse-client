import { Flex } from 'antd';

import { useIssue } from '@/features/issue-device/model/useIssue';
import { Spinner } from '@/shared/ui/spinner/Spinner';
import { IssueProcessesTable } from '@/widgets/issue-processes-table/ui/IssueProcessesTable';

import { useIssueList } from '../model/useIssueList';
import { HeaderIssues } from './header/HeaderIssues';

export const IssueList = () => {
  const { page, limit, selectedRowKeys, issueProcesses, isLoading, selectedIssue, onSelect } =
    useIssueList();
  const { actions } = useIssue();

  return (
    <Flex vertical gap={20} justify="center">
      {isLoading ? (
        <Spinner fontSize={30} color="var(--blue-600)" />
      ) : (
        <>
          <HeaderIssues
            selectedIssue={selectedIssue}
            onStart={actions.handleStartNewIssue}
            onDelete={actions.handleDeleteIssueProcess}
          />
          <IssueProcessesTable
            page={page}
            limit={limit}
            selectedRowKeys={selectedRowKeys}
            issueProcesses={issueProcesses}
            onSelect={onSelect}
          />
        </>
      )}
    </Flex>
  );
};
