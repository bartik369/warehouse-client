import { ReactNode } from 'react';

import { IconType } from 'react-icons';

import styles from './SelectStatus.module.scss';

interface SelectStatusProps {
  icon: IconType;
  label: string;
  color: string;
}
export const SelectStatus = ({ icon: Icon, label, color }: SelectStatusProps) => {
  return (
    <span className={styles.container}>
      <Icon size={14} color={color} />
      {label}
    </span>
  );
};
