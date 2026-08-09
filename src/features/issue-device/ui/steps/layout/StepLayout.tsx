import type { ReactNode } from 'react';

import { Card, Flex } from 'antd';

import { BUTTON_LABELS } from '@/utils/constants/ui/buttons';

import styles from './StepLayout.module.scss';

interface StepLayoutProps {
  left: ReactNode;
  center?: ReactNode;
  right: ReactNode;
  currentStep: number;
  disabledStep: boolean;
  hideBack?: boolean;
  leftWidth?: number | string;
  onNext: () => void;
  onBack: () => void;
}
export const StepLayout = ({
  left,
  center,
  right,
  currentStep,
  disabledStep,
  hideBack = false,
  leftWidth = 400,
  onBack,
  onNext,
}: StepLayoutProps) => {
  return (
    <Flex gap={30} align="stretch" vertical className={styles.container}>
      {center && (
        <Card
          styles={{
            body: {
              padding: '10px 20px',
            },
          }}
          className={styles.centerBlock}
        >
          {center}
        </Card>
      )}
      <Flex className={styles.content}>
        <Card
          className={styles.leftBlock}
          style={{ flex: `0 0 ${typeof leftWidth === 'number' ? `${leftWidth}px` : leftWidth}` }}
        >
          {left}
        </Card>
        <Card className={styles.rightBlock}>{right}</Card>
      </Flex>
      <Flex gap={20} justify="space-between">
        {!hideBack && (
          <button className={styles.prevBtn} disabled={currentStep === 0} onClick={onBack}>
            {BUTTON_LABELS.prev}
          </button>
        )}
        <button className={styles.nextBtn} disabled={disabledStep} onClick={onNext}>
          {BUTTON_LABELS.next}
        </button>
      </Flex>
    </Flex>
  );
};
