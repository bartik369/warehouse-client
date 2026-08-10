import { Button, Flex, Typography } from 'antd';
import { IoIosAdd } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

import { Spinner } from '@/shared/ui/spinner/Spinner';
import { IssueProcessesTable } from '@/widgets/issue-processes-table/ui/IssueProcessesTable';

import { useIssueList } from '../model/useIssueList';
import styles from './IssueList.module.scss';

export const IssueList = () => {
  const navigate = useNavigate();
  const { page, limit, selectedRowKeys, issueProcesses, isLoading, onSelect } = useIssueList();

  return (
    <Flex vertical gap={20} justify="center">
      <Flex className={styles.header} justify="space-between">
        <Flex vertical>
          <Typography.Title className={styles.title} level={1}>
            Выдачи устройств
          </Typography.Title>
          <span className={styles.description}>
            Список всех процессов выдачи устройств сотрудникам
          </span>
        </Flex>
        <button className={styles.addBtn} onClick={() => navigate('/issues/new')}>
          <IoIosAdd size={22} />
          <span>Выдать устройства</span>
        </button>
      </Flex>
      {isLoading ? (
        <Spinner fontSize={30} color="var(--blue-600)" />
      ) : (
        <IssueProcessesTable
          page={page}
          limit={limit}
          selectedRowKeys={selectedRowKeys}
          issueProcesses={issueProcesses}
          onSelect={onSelect}
        />
      )}
    </Flex>
  );
};
