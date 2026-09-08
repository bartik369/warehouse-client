import { Card, Flex, Typography } from 'antd';

import styles from './FormSection.module.scss';

type FormSectionProps = {
  title?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
};

export const FormSection = ({ title, icon, children }: FormSectionProps) => {
  return (
    <Card
      styles={{
        body: {
          padding: '18px',
        },
      }}
    >
      <Flex className={styles.block}>
        {icon && <div className={styles.icon}>{icon}</div>}
        <Typography.Title className={styles.title} level={5}>
          {title}
        </Typography.Title>
      </Flex>
      {children}
    </Card>
  );
};
