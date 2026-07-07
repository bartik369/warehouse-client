import React from 'react';

import { Button, Space } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import { IconType } from 'react-icons';
import { HiArrowPath, HiPlus } from 'react-icons/hi2';

import { BUTTON_LABELS } from '@/utils/constants/ui/buttons';

import styles from './ActionsPanel.module.scss';

interface ActionsPanelProps {
  titleApply?: string;
  titleReset?: string;
  size?: SizeType;
  applyIcon?: React.ReactNode;
  resetIcon?: React.ReactNode;
  children: React.ReactNode;
  onReset: () => void;
  onApply: () => void;
}

export const ActionsPanel = ({
  children,
  titleApply = BUTTON_LABELS.add,
  titleReset = BUTTON_LABELS.reset,
  size = 'middle',
  applyIcon = <HiPlus />,
  resetIcon = <HiArrowPath />,
  onReset,
  onApply,
}: ActionsPanelProps) => {
  return (
    <div className={styles.container}>
      {children}
      <Space>
        <Button icon={resetIcon} className={styles.reset} size={size} onClick={onReset}>
          {titleReset}
        </Button>
        <Button
          icon={applyIcon}
          className={styles.apply}
          type="primary"
          size={size}
          onClick={onApply}
        >
          {titleApply}
        </Button>
      </Space>
    </div>
  );
};
