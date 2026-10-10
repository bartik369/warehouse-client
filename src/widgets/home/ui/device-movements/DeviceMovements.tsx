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
import { ChartPeriods, Period } from '../../model/types';
import styles from './DeviceMovements.module.scss';

interface DeviceMovementsProps {
  value: Period;
  onPeriodChange: (chart: keyof ChartPeriods, value: Period) => void;
}

export const DeviceMovements = ({ value, onPeriodChange }: DeviceMovementsProps) => {
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
          value={value}
          options={additionsPeriods}
          onChange={(value) => onPeriodChange('deviceMovements', value)}
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
