import { Button, Flex } from 'antd';
import { SizeType } from 'antd/es/config-provider/SizeContext';

import styles from './ActionButtons.module.scss';

interface ActionButtonsProps {
  titleApply?: string;
  titleReset?: string;
  applyIcon?: React.ReactNode;
  resetIcon?: React.ReactNode;
  size?: SizeType;
  loading?: boolean;
  disabled?: boolean;
  onApply: () => void;
  onReset: () => void;
}
export const ActionButtons = ({
  titleApply,
  titleReset,
  applyIcon,
  resetIcon,
  size = 'large',
  loading,
  disabled = false,
  onReset,
  onApply,
}: ActionButtonsProps) => {
  return (
    <Flex gap={10} className={styles.container}>
      <Button icon={resetIcon} className={styles.reset} size={size} onClick={onReset}>
        {titleReset}
      </Button>
      <Button
        disabled={disabled}
        loading={loading}
        icon={applyIcon}
        className={styles.apply}
        type="primary"
        size={size}
        onClick={onApply}
      >
        {titleApply}
      </Button>
    </Flex>
  );
};
