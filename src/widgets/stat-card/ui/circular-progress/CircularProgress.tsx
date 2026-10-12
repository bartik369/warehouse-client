import { Progress } from 'antd';

import { CircularProgressVariant } from '@/shared/types/variants';

import { circularProgressColors } from '../../model/constants';

interface CircularProgressProps {
  colorVariant: CircularProgressVariant;
  size?: number;
  fontSize?: number;
  percent: number;
  suffix?: string;
}

export const CircularProgress = ({
  colorVariant,
  size = 40,
  fontSize = 14,
  percent,
  suffix,
}: CircularProgressProps) => {
  return (
    <Progress
      strokeWidth={12}
      size={size}
      type="circle"
      percent={percent}
      strokeColor={circularProgressColors[colorVariant]}
      format={(value) => (
        <span style={{ fontSize, fontWeight: 700 }}>
          {value}
          {suffix && (
            <span style={{ fontSize: 11, fontWeight: 'normal', color: 'var(--gray-600)' }}>
              {suffix}
            </span>
          )}
        </span>
      )}
    />
  );
};
