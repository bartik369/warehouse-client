import React from 'react';

import { Button, Space } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';

import { BUTTON_LABELS } from '@/utils/constants/ui/buttons';

import styles from './ActionsPanel.module.scss';

interface ActionsPanelProps {
  size?: SizeType;
  children: React.ReactNode;
  onReset: () => void;
  onApply: () => void;
}

export const ActionsPanel = ({
  children,
  size = 'middle',
  onReset,
  onApply,
}: ActionsPanelProps) => {
  return (
    <div className={styles.container}>
      {children}
      <Space>
        <Button className={styles.reset} size={size} onClick={onReset}>
          {BUTTON_LABELS.reset}
        </Button>
        <Button className={styles.apply} type="primary" size={size} onClick={onApply}>
          {BUTTON_LABELS.ok}
        </Button>
      </Space>
    </div>
  );
};
