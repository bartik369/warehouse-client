import clsx from 'clsx';
import { IconType } from 'react-icons';

import styles from './CustomTag.module.scss';
import { Status } from './types';

interface CustomTagProps {
  title: string;
  icon?: IconType;
  variant?: Status;
  iconSize?: number;
  size?: 'sm' | 'md' | 'lg';
}
export const CustomTag = ({
  title,
  icon,
  variant = 'success',
  size = 'md',
  iconSize = 20,
}: CustomTagProps) => {
  const Icon = icon;
  return (
    <div className={clsx(styles.tag, styles[variant], styles[size])}>
      {Icon && <Icon size={iconSize} />}
      <span>{title}</span>
    </div>
  );
};
