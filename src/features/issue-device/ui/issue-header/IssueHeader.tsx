import { CheckOutlined } from '@ant-design/icons';
import { Flex, Typography } from 'antd';
import clsx from 'clsx';

import { BASE_STEPS } from '../../model/constants';
import styles from './IssueHeader.module.scss';

interface IssueHeaderProps {
  step: number;
}

export const IssueHeader = ({ step }: IssueHeaderProps) => {
  const currentStep = BASE_STEPS[step];

  return (
    <Flex align="center" gap={50}>
      <div className={styles.leftSide}>
        <div className={styles.stepIndicator}>
          Шаг {step + 1} из {BASE_STEPS.length}
        </div>
        <Typography.Title level={3}>{currentStep.title}</Typography.Title>
        <Typography.Text className={styles.description}>{currentStep.content}</Typography.Text>
      </div>

      <div className={styles.rightSide}>
        <div className={styles.steps}>
          {BASE_STEPS.map((item, index) => {
            const isFinished = index < step;
            const isCurrent = index === step;
            const isAvailable = index <= step;

            return (
              <div key={index} className={styles.step}>
                <span className={styles.stepIcon}>
                  <span
                    className={clsx(
                      styles.circle,
                      isFinished && styles.circleFinished,
                      isCurrent && styles.circleCurrent
                    )}
                  >
                    {isFinished ? <CheckOutlined /> : index + 1}
                  </span>
                  <span
                    className={clsx(
                      styles.stepTitle,
                      isCurrent && styles.stepTitleCurrent,
                      !isAvailable && styles.stepTitleDisabled
                    )}
                  >
                    {item.title}
                  </span>
                </span>

                {index < BASE_STEPS.length - 1 && (
                  <span className={clsx(styles.line, isFinished && styles.lineFinished)} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Flex>
  );
};
