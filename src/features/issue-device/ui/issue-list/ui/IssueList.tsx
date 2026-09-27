import { Flex } from 'antd';

import { useIssue } from '@/features/issue-device/model/useIssue';
import { MovementFilters } from '@/shared/ui/movement-filters/MovementFilters';
import { IssueProcessesTable } from '@/widgets/issue-processes-table/ui/IssueProcessesTable';

import { useIssueList } from '../model/useIssueList';
import { useIssueTableController } from '../model/useIssueTableController';
import { HeaderIssues } from './header/HeaderIssues';

export const IssueList = () => {
  const {
    filters,
    selectedRowKeys,
    selectedIssue,
    warehousesOptions,
    onSelect,
    onDelete,
    onSearch,
    onWarehouseChange,
  } = useIssueList();
  const { actions, warehouseController } = useIssue();
  const { page, limit, issueProcesses, totalCount, isFetching, isLoading, setPage, setLimit } =
    useIssueTableController(filters);

  return (
    <Flex vertical gap={20} justify="center">
      <HeaderIssues
        selectedIssue={selectedIssue}
        onStart={actions.handleStartNewIssue}
        onDelete={actions.handleDeleteIssueProcess}
      />
      <MovementFilters
        filters={filters}
        warehouseOptions={warehousesOptions}
        onSearch={onSearch}
        onWarehouseChange={onWarehouseChange}
      />
      <IssueProcessesTable
        loading={isLoading}
        page={page}
        limit={limit}
        totalCount={totalCount}
        selectedRowKeys={selectedRowKeys}
        issueProcesses={issueProcesses}
        onSelect={onSelect}
        onDelete={onDelete}
        setPage={setPage}
        setLimit={setLimit}
      />
    </Flex>
  );
};
