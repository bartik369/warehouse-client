import { ReactNode } from 'react';

import type { ButtonProps } from 'antd';
import clsx from 'clsx';

import styles from './BackToListButton.module.scss';

interface BackToListButtonProps {
  title: string;
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  type?: ButtonProps['htmlType'];
  onClick: () => void;
}
export const BackToListButton = ({
  title,
  size = 'md',
  type = 'button',
  children,
  onClick,
}: BackToListButtonProps) => {
  return (
    <button onClick={onClick} type={type} className={clsx(styles.button, styles[size])}>
      {children}
      <span>{title}</span>
    </button>
  );
};
