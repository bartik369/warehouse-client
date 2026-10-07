import { useEffect, useRef, useState } from 'react';

import { Button, Card, Empty, Flex, Spin, Typography } from 'antd';
import { IoIosArrowDown } from 'react-icons/io';
import { Pie, PieChart } from 'recharts';

import { calculatePercentage } from '@/shared/utils/data/calculations';

import { DESCRIPTIONS, TITLES, categoryColors } from '../../model/constants';
import { DeviceStatistics } from '../../model/types';
import styles from './DevicesByCategory.module.scss';
import { renderPieSector } from './renderPieSector';

interface DevicesByCategoryProps {
  loading: boolean;
  totalCount: number;
  categories: DeviceStatistics['byCategory'];
}

export const DevicesByCategory = ({ loading, totalCount, categories }: DevicesByCategoryProps) => {
  const legendRef = useRef<HTMLDivElement>(null);
  const [canScrollDown, setCanScrollDown] = useState(false);

  const handleScrollDown = () => {
    legendRef.current?.scrollBy({
      top: 100,
      behavior: 'smooth',
    });
  };

  const handleScroll = () => {
    const element = legendRef.current;
    if (!element) return;
    const canScroll = element.scrollTop + element.clientHeight < element.scrollHeight - 1;
    setCanScrollDown(canScroll);
  };

  useEffect(() => {
    const element = legendRef.current;
    if (!element) return;

    const canScroll = element.scrollTop + element.clientHeight < element.scrollHeight;
    setCanScrollDown(canScroll);
  }, [categories]);

  return (
    <Card className={styles.card}>
      <Flex vertical>
        <Typography.Title className={styles.title} level={2}>
          {TITLES.deviceCategories}
        </Typography.Title>
        <span className={styles.descriptions}>{DESCRIPTIONS.deviceCategories}</span>
      </Flex>
      <Spin spinning={loading}>
        {categories.length === 0 ? (
          <Empty />
        ) : (
          <Flex align="center" style={{ minHeight: '200px' }}>
            <Flex align="center">
              <div className={styles.chartWrapper}>
                <PieChart className={styles.chart} width={215} height={200}>
                  <Pie
                    data={categories}
                    dataKey="count"
                    nameKey="name"
                    innerRadius={60}
                    outerRadius={90}
                    shape={renderPieSector}
                  />
                </PieChart>
                <Flex vertical align="center" justify="center" className={styles.chartCenter}>
                  <div className={styles.count}>{totalCount}</div>
                  <div className={styles.description}>Устройств</div>
                </Flex>
              </div>
              <div className={styles.legendWrapper}>
                <Flex ref={legendRef} vertical className={styles.legend} onScroll={handleScroll}>
                  {categories.map((item) => (
                    <div key={item.slug} className={styles.legendRow}>
                      <span
                        className={styles.marker}
                        style={{ backgroundColor: categoryColors[item.slug] ?? 'var(--gray-400)' }}
                      />
                      <span className={styles.name}>{item.name}</span>
                      <span className={styles.value}>{item.count}</span>
                      <span className={styles.percent}>
                        {calculatePercentage(item.count, totalCount)}%
                      </span>
                    </div>
                  ))}
                </Flex>
                {canScrollDown && (
                  <div className={styles.scrollHint}>
                    <Button
                      className={styles.button}
                      icon={<IoIosArrowDown />}
                      onClick={handleScrollDown}
                    />
                  </div>
                )}
              </div>
            </Flex>
          </Flex>
        )}
      </Spin>
    </Card>
  );
};
