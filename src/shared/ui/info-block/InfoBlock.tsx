import { ReactNode } from 'react';

import { Flex } from 'antd';
import clsx from 'clsx';

import styles from './InfoBlock.module.scss';

interface InfoBlockProps {
  icon?: ReactNode;
  title?: string;
  description: string;
  variant?: 'info' | 'hint' | 'warning' | 'success' | 'error';
}
export const InfoBlock = ({ icon, title, description, variant = 'info' }: InfoBlockProps) => {
  return (
    <Flex className={clsx(styles.container, styles[variant])}>
      <div className={styles.title}>
        {icon}
        <span>{title}</span>
      </div>
      <span className={styles.description}>{description}</span>
    </Flex>
  );
};
