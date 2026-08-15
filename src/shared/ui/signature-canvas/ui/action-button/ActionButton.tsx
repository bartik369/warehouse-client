import { ButtonHTMLAttributes } from 'react';

import clsx from 'clsx';
import { IconType } from 'react-icons';

import styles from './ActionButton.module.scss';
import { Actions } from './types';

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  icon?: IconType;
  variant: Actions;
  iconSize?: number;
}
export const ActionButton = ({
  title,
  variant,
  icon: Icon,
  iconSize = 16,
  type = 'button',
  className,
  ...buttonProps
}: ActionButtonProps) => {
  return (
    <button
      type={type}
      {...buttonProps}
      className={clsx(styles.button, styles[variant], className)}
    >
      {Icon && <Icon size={iconSize} />}
      <span>{title}</span>
    </button>
  );
};
