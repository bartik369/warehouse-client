import { Card, Flex, Table, Typography } from 'antd';
import { VscArrowSmallRight } from 'react-icons/vsc';
import { Link } from 'react-router-dom';

import { IssueProcessListItem } from '@/features/issue-device/model/types';
import { ROUTES } from '@/shared/config/routes/routes';

import { DESCRIPTIONS, LABELS, TITLES } from '../../model/constants';
import styles from './RecentIssuances.module.scss';
import { RecentIssuancesColumns } from './recentIssuances.columns';

interface RecentIssuancesProps {
  issues: IssueProcessListItem[];
  loading: boolean;
}
export const RecentIssuances = ({ issues, loading }: RecentIssuancesProps) => {
  const columns = RecentIssuancesColumns();
  return (
    <Card className={styles.card}>
      <Flex justify="space-between" align="center">
        <Flex vertical>
          <Typography.Title className={styles.title} level={2}>
            {TITLES.recentIssues}
          </Typography.Title>
          <span className={styles.description}>{DESCRIPTIONS.recentIssues}</span>
        </Flex>
        <Link className={styles.link} to={ROUTES.ISSUES}>
          <span>{LABELS.allIssues}</span>
          <VscArrowSmallRight size={18} />
        </Link>
      </Flex>
      <Table<IssueProcessListItem>
        rowKey="id"
        loading={loading}
        columns={columns}
        dataSource={issues}
        pagination={false}
        size="small"
        className={styles.table}
      />
    </Card>
  );
};
