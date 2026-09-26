import { ReactNode } from 'react';

import { Flex, Typography } from 'antd';

import styles from './CardTitle.module.scss';

interface CardTitleProps {
  title: string;
  icon: ReactNode;
}
export const CardTitle = ({ title, icon }: CardTitleProps) => {
  return (
    <Flex className={styles.container}>
      <div className={styles.icon}>{icon}</div>
      <Typography.Title className={styles.title} level={2}>
        {title}
      </Typography.Title>
    </Flex>
  );
};
