import { ReactNode } from 'react';

import clsx from 'clsx';
import { RiArrowRightSLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

import { InformationVariant } from '@/shared/types/variants';

import styles from './AttentionRequired.module.scss';

interface AttentionItemProps {
  title: string;
  description: string;
  value: number;
  icon?: ReactNode;
  link?: string;
  loading?: boolean;
  variant: InformationVariant;
}

export const AttentionItem = ({
  title,
  description,
  value,
  icon,
  variant,
  link = '#',
  loading,
}: AttentionItemProps) => {
  return (
    <div className={clsx(styles.container, styles[variant])}>
      <div className={styles.icon}>{icon}</div>
      <div className={styles.info}>
        <span className={styles.title}>{title}</span>
        <span className={styles.description}>{description}</span>
      </div>
      <span className={styles.value}>{value}</span>
      <Link className={styles.arrow} to={link}>
        <RiArrowRightSLine />
      </Link>
    </div>
  );
};
