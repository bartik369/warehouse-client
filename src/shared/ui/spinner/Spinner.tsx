import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

interface SpinnerProps {
  color?: string;
  fontSize?: number;
}

export const Spinner = ({ color = 'var(--gray-600)', fontSize = 32 }: SpinnerProps) => {
  return <Spin indicator={<LoadingOutlined spin style={{ color: color, fontSize: fontSize }} />} />;
};
