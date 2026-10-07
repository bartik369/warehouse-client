import { Card, Flex, SegmentedProps, Typography } from 'antd';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { formatMonth } from '@/shared/lib/format/formatDate';
import { SegmentedMenu } from '@/shared/ui/segmented/SegmentedMenu';

import { DESCRIPTIONS, TITLES, additionsPeriods, mockData } from '../../model/constants';
import { DeviceAdditionsPeriod } from '../../model/types';
import styles from './DeviceAdditions.module.scss';

interface DeviceAdditionsProps {
  value: DeviceAdditionsPeriod;
  onPeriodChange: (value: DeviceAdditionsPeriod) => void;
}

export const DeviceAdditions = ({ value, onPeriodChange }: DeviceAdditionsProps) => {
  return (
    <Card className={styles.card}>
      <Flex className={styles.cardHeader}>
        <Flex vertical>
          <Typography.Title className={styles.title} level={2}>
            {TITLES.deviceAdditions}
          </Typography.Title>
          <span className={styles.description}>{DESCRIPTIONS.deviceAdditions}</span>
        </Flex>
        <SegmentedMenu<DeviceAdditionsPeriod>
          variant="small"
          value={value}
          options={additionsPeriods}
          onChange={onPeriodChange}
        />
      </Flex>
      <div className={styles.chart}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={mockData}>
            <defs>
              <linearGradient id="deviceAdditionsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--blue-500)" stopOpacity={0.35} />
                <stop offset="100%" stopColor="var(--blue-500)" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="var(--gray-200)" strokeDasharray="4 4" vertical={false} />
            <XAxis
              dataKey="month"
              tickFormatter={formatMonth}
              interval={0}
              textAnchor="end"
              height={30}
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 10,
                fill: 'var(--gray-600)',
              }}
            />
            <YAxis
              width={30}
              axisLine={false}
              tickLine={false}
              allowDecimals={false}
              tick={{ fontSize: 11, fill: 'var(--gray-600)' }}
            />
            <Tooltip
              cursor={{
                stroke: 'var(--gray-300)',
                strokeWidth: 1,
                strokeDasharray: '4 4',
              }}
              labelStyle={{ fontSize: 11, fontWeight: 'bold' }}
              itemStyle={{ fontSize: 12, color: 'var(--gray-700)' }}
            />
            <Area
              name="Добавлено"
              type="monotone"
              dataKey="added"
              stroke="var(--blue-500)"
              strokeWidth={2}
              fill="url(#deviceAdditionsGradient)"
              dot={{
                r: 4,
                fill: 'var(--blue-500)',
                stroke: 'var(--white)',
                strokeWidth: 2,
              }}
              activeDot={{
                r: 7,
                fill: 'var(--blue-500)',
                stroke: 'var(--white)',
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
