import { Progress } from 'antd';

import { CircularProgressVariant } from '@/shared/types/variants';

import { circularProgressColors } from '../../model/constants';

interface CircularProgressProps {
  colorVariant: CircularProgressVariant;
  size?: number;
  percent: number;
}

export const CircularProgress = ({ colorVariant, size = 40, percent }: CircularProgressProps) => {
  return (
    <Progress
      strokeWidth={12}
      size={size}
      type="circle"
      percent={percent}
      strokeColor={circularProgressColors[colorVariant]}
    />
  );
};
