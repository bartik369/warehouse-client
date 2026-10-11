import { Card, Flex, Progress } from 'antd';
import clsx from 'clsx';

import { formatDate } from '@/shared/lib/date/formatDate';
import { CustomTag } from '@/shared/ui/custom-tag/CustomTag';

import { InventoryOverviewItem, inventoryStatus } from '../../model/types';
import styles from './InventoryOverview.module.scss';

interface InventoryItemProps {
  percent: number; // todo после удаления моков реализовать фунцию подсчета
  data: InventoryOverviewItem;
}

export const InventoryItem = ({ percent, data }: InventoryItemProps) => {
  const status = data.status;
  const remainingCount = data.expectedCount - data.foundCount - data.discrepancyCount;
  const totalFound = data.foundCount + data.discrepancyCount;
  const strokeColor = status === 'completed' ? 'var(--green-400)' : 'var(--blue-400)';
  return (
    <Card className={styles.item}>
      <Flex className={styles.header}>
        <div className={styles.info}>
          <span className={styles.warehouse}>{data.warehouse.name}</span>
          <span className={styles.description}>Инвентаризация №{data.processId}</span>
        </div>
        <div className={styles.status}>
          <CustomTag
            title={inventoryStatus[data.status]}
            size="sm"
            variant={status === 'completed' ? 'success' : 'processing'}
          />
          <span className={styles.date}>
            {status === 'completed'
              ? formatDate(data.completedAt, 'date')
              : formatDate(data.createdAt, 'date')}
          </span>
        </div>
      </Flex>
      <Flex className={styles.summary}>
        <span className={styles.value}>{totalFound}</span> из
        <span className={styles.value}>{data.expectedCount}</span> проверено
      </Flex>
      <Progress
        className={styles.progress}
        percent={percent}
        strokeColor={strokeColor}
        strokeWidth={5}
        format={(value) => `${value}%`}
      />
      <Flex className={styles.counts}>
        <div className={styles.count}>
          <span className={clsx(styles.value, styles['green'])}>{data.foundCount}</span>
          <span className={styles.info}>Совпало</span>
        </div>
        <div className={styles.count}>
          <span className={clsx(styles.value, styles['red'])}>{data.discrepancyCount}</span>
          <span className={styles.info}>Расхождения</span>
        </div>
        <div className={styles.count}>
          <span className={styles.value}>{remainingCount}</span>
          <span className={styles.info}>{status === 'completed' ? 'Не найдено' : 'Осталось'}</span>
        </div>
      </Flex>
    </Card>
  );
};
