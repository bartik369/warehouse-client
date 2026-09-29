import { Flex } from 'antd';

import { useIssue } from '@/features/issue-device/model/useIssue';
import { MovementFilters } from '@/shared/ui/movement-filters/MovementFilters';
import { IssueProcessesTable } from '@/widgets/issue-processes-table/ui/IssueProcessesTable';

import { useIssueList } from '../model/useIssueList';
import { useIssueTableController } from '../model/useIssueTableController';
import { HeaderIssues } from './header/HeaderIssues';

export const IssueList = () => {
  const { data, status, issueListActions } = useIssueList();
  const { actions } = useIssue();
  const { page, limit, issueProcesses, totalCount, isFetching, isLoading, setPage, setLimit } =
    useIssueTableController(data.queryFilters);

  return (
    <Flex vertical gap={20} justify="center">
      <HeaderIssues
        selectedIssue={data.selectedIssue}
        onStart={actions.handleStartNewIssue}
        onDelete={actions.handleDeleteIssueProcess}
      />
      <MovementFilters
        processes={issueProcesses}
        data={data}
        status={status}
        actions={issueListActions}
      />
      <IssueProcessesTable
        loading={isLoading || isFetching}
        page={page}
        limit={limit}
        totalCount={totalCount}
        selectedRowKeys={data.selectedRowKeys}
        issueProcesses={issueProcesses}
        onSelect={issueListActions.onSelect}
        onDelete={issueListActions.onDelete}
        setPage={setPage}
        setLimit={setLimit}
      />
    </Flex>
  );
};
