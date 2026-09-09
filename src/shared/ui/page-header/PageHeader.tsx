import { ReactNode } from 'react';

import { Flex, Typography } from 'antd';

import styles from './PageHeader.module.scss';

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
}

export const PageHeader = ({ title, description, actions }: PageHeaderProps) => {
  return (
    <Flex className={styles.container}>
      <div>
        <Typography.Title className={styles.title} level={1}>
          {title}
        </Typography.Title>
        {description && <span className={styles.description}>{description}</span>}
      </div>
      {actions && <Flex>{actions}</Flex>}
    </Flex>
  );
};
