import { ReactNode } from 'react';

import { Card, Flex } from 'antd';
import clsx from 'clsx';

import { CircularProgressVariant } from '@/shared/types/variants';
import { Spinner } from '@/shared/ui/spinner/Spinner';

import styles from './StatCard.module.scss';

interface StatCardProps {
  loading?: boolean;
  icon: ReactNode;
  label: string;
  value: number;
  description?: string;
  colorVariant: CircularProgressVariant;
  children?: ReactNode;
}

export const StatCard = ({
  loading,
  icon,
  colorVariant = 'gray',
  label,
  value,
  description,
  children,
}: StatCardProps) => {
  return (
    <Card className={styles.card}>
      <Flex className={styles.container}>
        <div className={clsx(styles.icon, styles[colorVariant])}>{icon}</div>
        <Flex className={styles.info}>
          <Flex className={styles.content}>
            <div className={styles.label}>{label}</div>
            <div className={styles.value}>
              {loading ? <Spinner fontSize={20} color="var(--gray-400)" /> : value}
            </div>
            {description && <div className={styles.description}>{description}</div>}
          </Flex>
          {children && <div className={styles.children}>{children}</div>}
        </Flex>
      </Flex>
    </Card>
  );
};
