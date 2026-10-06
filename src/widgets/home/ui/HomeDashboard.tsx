import { Flex } from 'antd';

import { useHomeDashboard } from '../model/useHomeDashboard';
import styles from './HomeDashboard.module.scss';
import { DeviceStats } from './device-stats/DeviceStats';
import { DevicesByCategory } from './devices-by-category/DevicesByCategory';

export const HomeDashboard = () => {
  const { categories, loading, totalCount, assignedCount, availableCount, underRepairCount } =
    useHomeDashboard();

  return (
    <Flex vertical gap={20}>
      <DeviceStats
        loading={loading}
        totalCount={totalCount}
        assignedCount={assignedCount}
        availableCount={availableCount}
        underRepairCount={underRepairCount}
      />
      <div className={styles.test}>
        <DevicesByCategory categories={categories} totalCount={totalCount} loading={loading} />
      </div>
    </Flex>
  );
};
