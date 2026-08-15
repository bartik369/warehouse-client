import { ButtonHTMLAttributes } from 'react';

import { IconType } from 'react-icons';

import styles from './StartProcessButton.module.scss';

interface StartProcessButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  icon?: IconType;
  iconSize?: number;
}
export const StartProcessButton = ({
  title,
  iconSize = 20,
  icon: Icon,
  type = 'button',
  className,
  ...buttonProps
}: StartProcessButtonProps) => {
  return (
    <button type={type} {...buttonProps} className={styles.btn}>
      {Icon && <Icon size={iconSize} />}
      <span>{title}</span>
    </button>
  );
};
