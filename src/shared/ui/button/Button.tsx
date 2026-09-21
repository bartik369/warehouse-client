import React from 'react';

import styles from './Button.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary';
  icon?: React.ReactNode;
  iconSize?: number;
}

export const Button = ({
  title,
  size = 'md',
  color = 'primary',
  icon,
  iconSize = 20,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`${styles.button} ${styles[size]} ${styles[color]} ${className ?? ''}`}
      {...props}
    >
      {icon && (
        <span className={styles.icon} style={{ width: iconSize, height: iconSize }}>
          {icon}
        </span>
      )}
      <span className={styles.title}>{title}</span>
    </button>
  );
};
