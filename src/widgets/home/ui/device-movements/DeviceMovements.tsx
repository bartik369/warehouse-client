import { Card, Flex, Typography } from 'antd';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { formatMonth } from '@/shared/lib/format/formatDate';
import { SegmentedMenu } from '@/shared/ui/segmented/SegmentedMenu';

import { DESCRIPTIONS, TITLES, additionsPeriods } from '../../model/constants';
import { mockDeviceMovements } from '../../model/mocks';
import { Period } from '../../model/types';
import styles from './DeviceMovements.module.scss';

export const DeviceMovements = () => {
  return (
    <Card className={styles.card}>
      <Flex className={styles.cardHeader}>
        <Flex vertical>
          <Typography.Title className={styles.title} level={2}>
            {TITLES.deviceMovements}
          </Typography.Title>
          <span className={styles.description}>{DESCRIPTIONS.deviceMovements}</span>
        </Flex>
        <SegmentedMenu<Period>
          variant="small"
          value="6m" // todo убрать хардкод после реализации бэка
          options={additionsPeriods}
          //   onChange={onPeriodChange} // todo прокинуть колбэк в хук в которм будет отдельный локальный
          //   стейт, создать либо новый, либо объект с ключами под каждый график с периодами
          onChange={() => console.log('click')}
        />
      </Flex>
      <div className={styles.chart}>
        <ResponsiveContainer width={'100%'} height={220}>
          <LineChart data={mockDeviceMovements.items}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="month"
              tickFormatter={formatMonth}
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 10,
                fill: 'var(--gray-600)',
              }}
            />
            <YAxis
              width={20}
              allowDecimals={false}
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 10,
                fill: 'var(--gray-600)',
              }}
            />
            <Tooltip
              contentStyle={{
                fontSize: 12,
              }}
              labelStyle={{
                fontSize: 11,
                fontWeight: 600,
              }}
              itemStyle={{
                fontSize: 12,
              }}
            />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Line
              type="monotone"
              dataKey="issued"
              name="Выдано"
              stroke="var(--blue-500)"
              strokeWidth={1.7}
            />
            <Line
              type="monotone"
              dataKey="returned"
              name="Принято"
              stroke="var(--green-400)"
              strokeWidth={1.7}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
