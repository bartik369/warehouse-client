import { LoadingOutlined } from '@ant-design/icons';
import { Flex, Spin } from 'antd';

import styles from './Spinner.module.scss';

interface SpinnerProps {
  color?: string;
  fontSize?: number;
  title?: string;
}

export const Spinner = ({ color = 'var(--gray-600)', fontSize = 32, title }: SpinnerProps) => {
  return (
    <Flex vertical align="center" gap={10}>
      <Spin indicator={<LoadingOutlined spin style={{ color: color, fontSize: fontSize }} />} />
      <span className={styles.title}>{title}</span>
    </Flex>
  );
};
