import { type ButtonHTMLAttributes, forwardRef } from 'react';

import clsx from 'clsx';
import type { IconType } from 'react-icons';

import styles from './ActionButton.module.scss';
import type { Actions } from './types';

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  variant: Actions;
  iconSize?: number;
  icon?: IconType;
}

export const ActionButton = forwardRef<HTMLButtonElement, ActionButtonProps>(
  (
    { title, variant, iconSize = 16, icon: Icon, type = 'button', className, ...buttonProps },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        {...buttonProps}
        className={clsx(styles.button, styles[variant], className)}
      >
        {Icon && <Icon size={iconSize} />}
        <span>{title}</span>
      </button>
    );
  }
);

ActionButton.displayName = 'ActionButton';
