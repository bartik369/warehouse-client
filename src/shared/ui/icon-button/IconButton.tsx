import { Button } from 'antd';
import clsx from 'clsx';

import styles from './IconButton.module.scss';

interface IconButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'primary' | 'danger';
  loading?: boolean;
}

export const IconButton = ({
  children,
  onClick,
  size = 'sm',
  variant = 'default',
  loading,
}: IconButtonProps) => {
  return (
    <Button
      loading={loading}
      onClick={onClick}
      className={clsx(styles.button, styles[size], styles[variant])}
    >
      {children}
    </Button>
  );
};
