import clsx from 'clsx';

import styles from './IconButton.module.scss';

interface IconButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'primary' | 'danger';
}

export const IconButton = ({
  children,
  onClick,
  size = 'sm',
  variant = 'default',
}: IconButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(styles.button, styles[size], styles[variant])}
    >
      {children}
    </button>
  );
};
