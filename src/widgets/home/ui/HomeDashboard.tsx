import { Flex } from 'antd';

import { useHomeDashboard } from '../model/useHomeDashboard';
import styles from './HomeDashboard.module.scss';
import { DeviceAdditions } from './device-additions/DeviceAdditions';
import { DeviceStats } from './device-stats/DeviceStats';
import { DevicesByCategory } from './devices-by-category/DevicesByCategory';
import { RecentIssuances } from './recent-issuances/RecentIssuances';

export const HomeDashboard = () => {
  const {
    recentIssues,
    recentIssuesLoading,
    period,
    categories,
    loading,
    totalCount,
    assignedCount,
    availableCount,
    underRepairCount,
    onPeriodChange,
  } = useHomeDashboard();

  return (
    <Flex vertical gap={20}>
      <DeviceStats
        loading={loading}
        totalCount={totalCount}
        assignedCount={assignedCount}
        availableCount={availableCount}
        underRepairCount={underRepairCount}
      />
      <div className={styles.container}>
        <DevicesByCategory categories={categories} totalCount={totalCount} loading={loading} />
        <DeviceAdditions value={period} onPeriodChange={onPeriodChange} />
      </div>
      <div className={styles.test}>
        <RecentIssuances issues={recentIssues} loading={recentIssuesLoading} />
      </div>
    </Flex>
  );
};
