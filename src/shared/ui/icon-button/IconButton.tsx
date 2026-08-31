import { type ButtonHTMLAttributes, forwardRef } from 'react';

import clsx from 'clsx';
import type { IconType } from 'react-icons';

import { Spinner } from '../spinner/Spinner';
import styles from './IconButton.module.scss';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  iconSize?: number;
  icon?: IconType;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'primary' | 'danger';
  background?: 'yes' | 'no';
  loading?: boolean;
  title?: string;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      iconSize = 16,
      icon: Icon,
      size = 'sm',
      variant = 'default',
      background = 'yes',
      loading = false,
      title,
      type = 'button',
      className,
      disabled,
      ...buttonProps
    },
    ref
  ) => {
    return (
      <button
        title={title}
        ref={ref}
        type={type}
        {...buttonProps}
        disabled={loading || disabled}
        className={clsx(
          styles.button,
          styles[size],
          styles[variant],
          styles[background],
          className
        )}
      >
        {loading ? <Spinner fontSize={12} /> : Icon && <Icon size={iconSize} />}
      </button>
    );
  }
);
